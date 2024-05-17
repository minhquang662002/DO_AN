import { useState, useRef, useEffect } from "react";

const CustomImage = ({ src, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      className={`w-full h-full select-none ${className} ${
        isLoaded ? "" : "bg-gray-300 animate-pulse"
      }`}
      src={src}
      alt="image"
    />
  );
};

export default CustomImage;
