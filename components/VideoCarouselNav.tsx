import { Icon } from './Icon';

export function VideoCarouselPrev({ onClick, label }: { onClick: () => void; label: string }) {
  return <button type="button" className="video-carousel-btn video-carousel-prev" onClick={onClick} aria-label={label}>
    <Icon name="arrow" size={16} />
  </button>;
}

export function VideoCarouselNext({ onClick, label }: { onClick: () => void; label: string }) {
  return <button type="button" className="video-carousel-btn video-carousel-next" onClick={onClick} aria-label={label}>
    <Icon name="arrow" size={16} />
  </button>;
}
