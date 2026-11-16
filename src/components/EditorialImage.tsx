import { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  fallbackLabel?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
}

export function EditorialImage({
  src,
  alt,
  className = '',
  aspectClassName = '',
  fallbackLabel,
  priority = false,
  objectFit = 'cover',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setHasError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#F3EFE7] text-[#6A645E] border border-[#E5DEC9] p-6 text-center ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Camera className="w-6 h-6 text-[#C5A059] mb-3 stroke-[1.25]" aria-hidden="true" />
        <span className="font-serif italic text-base text-[#2C2A29]">
          {fallbackLabel || alt}
        </span>
        <span className="text-xs text-[#6A645E] mt-1 tracking-wide">
          Registro guardado no nosso arquivo
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F3EFE7] ${aspectClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        } transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
