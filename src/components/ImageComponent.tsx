import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface ImageProps {
  src: string;
  imageHash: string;
  name: string;
  aspectRatio?: number; // optional
}

const ImageComponent: React.FC<ImageProps> = ({ src, imageHash, name, aspectRatio: fixedAspectRatio }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(fixedAspectRatio || 1);

  useEffect(() => {
    if (!fixedAspectRatio) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
        setImageLoaded(true);
      };
    } else {
      // if fixed aspect ratio, still set imageLoaded on real image load
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
    }
  }, [src, fixedAspectRatio]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0">
          <Blurhash
            hash={imageHash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            style={{
              transition: "opacity 0.7s ease",
              opacity: imageLoaded ? 0 : 1,
              filter: "blur(5px)",
            }}
          />
        </div>
      )}

      <img
        src={src}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out transform hover:scale-105"
        style={{
          opacity: imageLoaded ? 1 : 0,
          filter: imageLoaded ? "blur(0px)" : "blur(10px)",
        }}
      />
    </div>
  );
};

export default ImageComponent;
