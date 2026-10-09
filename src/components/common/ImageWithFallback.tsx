import React, { useState } from 'react';
import { getCategoryFallbackImage } from '../../data/productImages';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: string;
  fallbackSrc?: string;
}

/**
 * Image component with graceful error handling.
 * Automatically fails over to a category-specific fallback image if the primary URL fails,
 * while preventing infinite error loops.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category,
  fallbackSrc,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasErrored, setHasErrored] = useState<boolean>(false);

  // Sync if prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasErrored(false);
  }, [src]);

  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      const fallback = fallbackSrc || getCategoryFallbackImage(category);
      if (fallback && fallback !== currentSrc) {
        setCurrentSrc(fallback);
      }
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};
