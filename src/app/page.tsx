"use client";
import LazyImage from "./components/RandomFox";
import { useState } from "react";
import type { MouseEventHandler } from "react";
import { random } from "lodash";

const myRandom = () => random(1,123)
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Home() {
  const [images, setImages] = useState<Array<IFoxImagesItems>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const newImageItem: IFoxImagesItems = {
      id: generateId(),
      url: `https://randomfox.ca/images/${myRandom()}.jpg`,
    };
    setImages([...images, newImageItem]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button onClick={addNewFox}>Add Fox</button>
      {images.map(({ id, url }) => (
        <div key={id} className="m-4">
          <LazyImage
            src={url}
            className="rounded-2xl"
            width={320}
            height={"auto"}
          />
        </div>
      ))}
    </main>
  );
}
