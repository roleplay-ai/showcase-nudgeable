export function PhotoPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`photo-placeholder ${className}`}>
    <div className="photo-grid" />
    <span>{label}</span>
    <small>Replace with approved session photograph</small>
  </div>;
}
