import Image from 'next/image';
import { sessionPhotos } from './data';

export function SessionPhotoRow() {
  return <div className="session-photo-row">
    {sessionPhotos.map((photo) => <figure className="session-photo" key={photo.src}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
        className="session-photo-image"
      />
    </figure>)}
  </div>;
}
