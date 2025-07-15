import React from "react";
import useLazyImage from "../../hooks/useLazyImage";

interface ProblemImageProps {
  src: string;
  alt: string;
}

const ProblemImage = ({ src, alt }: ProblemImageProps) => {
  const { ref, isInView, isLoaded, setIsLoaded } = useLazyImage();

  return (
    <div ref={ref} className="relative w-full">
      {isInView ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full lg:min-w-[271px] lg:max-w-[304px] xl:min-w-[341px] xl:max-w-[397px] transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
};

export default ProblemImage;
