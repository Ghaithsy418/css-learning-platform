import { useState } from 'react';

interface PhotoRendererProps {
  imageUrl: string;
  altText: string;
  caption?: string;
}

export default function PhotoRenderer({
  imageUrl,
  altText,
  caption,
}: PhotoRendererProps) {
  const [hasError, setHasError] = useState(false);

  const showFallback = hasError || !imageUrl.trim();

  return (
    <figure className="w-full">
      {showFallback ? (
        <div className="flex min-h-52 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 px-4 py-8 text-center text-sm text-slate-600">
          Unable to load image.
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={altText}
          loading="lazy"
          onError={() => setHasError(true)}
          className="block w-full h-auto rounded-xl object-cover"
        />
      )}

      {caption && (
        <figcaption className="mt-2 text-sm text-slate-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
