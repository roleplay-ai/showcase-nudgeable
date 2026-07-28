import Image from 'next/image';
import { sessionPhotos } from './data';

export function SessionPhotoRow() {
  const photos = [...sessionPhotos, ...sessionPhotos];

  return <div className="session-photo-marquee" aria-label="GenAI masterclass session photos">
    <div className="session-photo-track">
      {photos.map((photo, index) => <figure className="session-photo" key={`${photo.src}-${index}`} aria-hidden={index >= sessionPhotos.length || undefined}>
        <Image
          src={photo.src}
          alt={index >= sessionPhotos.length ? '' : photo.alt}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 960px) 42vw, 280px"
          className="session-photo-image"
        />
      </figure>)}
    </div>
  </div>;
}
