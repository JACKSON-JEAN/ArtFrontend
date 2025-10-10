import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface ImageProps {
  src: string;
  imageHash: string
  name: string
}

const ImageComponent: React.FC<ImageProps> = ({ src, imageHash, name }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <div className={imageLoaded ? "hidden" : "block"}>
        <Blurhash
          hash={imageHash}
          height="100%"
          width="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
         />
      </div>
      <img 
          src={src} 
          alt={name}
          loading="lazy"
          className={`border rounded-sm w-full transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
    </>
  );
};

export default ImageComponent;
