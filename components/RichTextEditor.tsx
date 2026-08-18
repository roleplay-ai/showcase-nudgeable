'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

type Command =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'formatBlock'
  | 'createLink'
  | 'unlink'
  | 'insertHorizontalRule'
  | 'undo'
  | 'redo'
  | 'removeFormat';

const actions: Array<{ label: string; title: string; command: Command; value?: string }> = [
  { label: 'B', title: 'Bold', command: 'bold' },
  { label: 'I', title: 'Italic', command: 'italic' },
  { label: 'U', title: 'Underline', command: 'underline' },
  { label: 'S', title: 'Strikethrough', command: 'strikeThrough' },
  { label: 'H2', title: 'Heading', command: 'formatBlock', value: 'h2' },
  { label: 'H3', title: 'Subheading', command: 'formatBlock', value: 'h3' },
  { label: 'P', title: 'Paragraph', command: 'formatBlock', value: 'p' },
  { label: '•', title: 'Bullet list', command: 'insertUnorderedList' },
  { label: '1.', title: 'Numbered list', command: 'insertOrderedList' },
  { label: '“', title: 'Quote', command: 'formatBlock', value: 'blockquote' },
  { label: '—', title: 'Divider', command: 'insertHorizontalRule' },
  { label: 'L', title: 'Align left', command: 'justifyLeft' },
  { label: 'C', title: 'Align center', command: 'justifyCenter' },
  { label: 'R', title: 'Align right', command: 'justifyRight' }
];

export function RichTextEditor({
  initialHtml,
  onChange,
  disabled
}: {
  initialHtml: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const savedSelection = useRef<Range | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = initialHtml;
  }, []);

  function emit() {
    onChange(editorRef.current?.innerHTML || '');
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function saveSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) savedSelection.current = selection.getRangeAt(0);
  }

  function restoreSelection() {
    const selection = window.getSelection();
    if (!selection || !savedSelection.current) return;
    selection.removeAllRanges();
    selection.addRange(savedSelection.current);
  }

  function run(command: Command, value?: string) {
    focusEditor();
    restoreSelection();
    const commandValue = command === 'formatBlock' && value ? (value.startsWith('<') ? value : `<${value}>`) : value;
    document.execCommand(command, false, commandValue);
    emit();
  }

  function onToolbarMouseDown(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    saveSelection();
  }

  function applyLink() {
    const href = linkUrl.trim();
    if (!href) return;
    restoreSelection();
    document.execCommand('createLink', false, href);
    const selection = window.getSelection();
    const anchor = selection?.anchorNode?.parentElement?.closest('a');
    if (anchor) {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
    }
    setLinkOpen(false);
    setLinkUrl('https://');
    emit();
  }

  async function insertImage(file: File) {
    setUploading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('file', file);
      const response = await fetch('/api/blogs/upload', { method: 'POST', body: data });
      const payload = await response.json() as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || 'Could not upload the image.');
      focusEditor();
      restoreSelection();
      document.execCommand('insertHTML', false, `<img src="${payload.url}" alt="" />`);
      emit();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload the image.');
    } finally {
      setUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  }

  return <div className="blog-editor-field">
    <div className="rich-toolbar" role="toolbar" aria-label="Text formatting">
      {actions.map(action => (
        <button
          key={`${action.command}-${action.value || action.label}`}
          type="button"
          title={action.title}
          aria-label={action.title}
          disabled={disabled}
          onMouseDown={onToolbarMouseDown}
          onClick={() => run(action.command, action.value)}
        >
          {action.label}
        </button>
      ))}
      <button type="button" title="Link" aria-label="Add link" disabled={disabled} onMouseDown={onToolbarMouseDown} onClick={() => { saveSelection(); setLinkOpen(value => !value); }}>Link</button>
      <button type="button" title="Remove link" aria-label="Remove link" disabled={disabled} onMouseDown={onToolbarMouseDown} onClick={() => run('unlink')}>Unlink</button>
      <button type="button" title="Insert image" aria-label="Insert image" disabled={disabled || uploading} onMouseDown={onToolbarMouseDown} onClick={() => imageInputRef.current?.click()}>{uploading ? '…' : 'Photo'}</button>
      <button type="button" title="Clear formatting" aria-label="Clear formatting" disabled={disabled} onMouseDown={onToolbarMouseDown} onClick={() => run('removeFormat')}>Clear</button>
      <button type="button" title="Undo" aria-label="Undo" disabled={disabled} onMouseDown={onToolbarMouseDown} onClick={() => run('undo')}>Undo</button>
      <button type="button" title="Redo" aria-label="Redo" disabled={disabled} onMouseDown={onToolbarMouseDown} onClick={() => run('redo')}>Redo</button>
    </div>
    {linkOpen && (
      <div className="rich-link-bar">
        <input value={linkUrl} onChange={event => setLinkUrl(event.target.value)} placeholder="https://" aria-label="Link URL" onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); applyLink(); } }} />
        <button type="button" onClick={applyLink}>Add link</button>
        <button type="button" onClick={() => setLinkOpen(false)}>Cancel</button>
      </div>
    )}
    <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={event => { const file = event.target.files?.[0]; if (file) void insertImage(file); }} />
    <div
      ref={editorRef}
      className="rich-editor blog-prose"
      contentEditable={!disabled}
      role="textbox"
      aria-multiline="true"
      aria-label="Blog content"
      data-placeholder="Write the article…"
      suppressContentEditableWarning
      onInput={emit}
      onBlur={emit}
      onMouseUp={saveSelection}
      onKeyUp={saveSelection}
    />
    {error && <p className="form-message error">{error}</p>}
  </div>;
}
