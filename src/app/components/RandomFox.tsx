"use client";
import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

type LazyImageProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

const RandomFox = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        setCurrentSrc(src);

        if (typeof onLazyLoad === "function") {
          onLazyLoad(node.current);
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad]);

  return <img ref={node} src={src} alt="foxy" {...imgProps} />;
};

export default RandomFox;
