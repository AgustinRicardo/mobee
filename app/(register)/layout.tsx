import { images } from "@/lib/constants";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function RegisterLayout({ children }: Props) {
  const selectedImage = images[Math.floor(Math.random() * images.length)];

  return (
    <main className="flex flex-row">
      <div className="relative z-0 h-[100vh]">
        <div className="absolute z-10 bg-loginGradient w-full h-full"></div>
        <img
          src={selectedImage.poster}
          alt="imagen"
          className="h-full object-cover"
        />
      </div>
      <span className="text-beeBeig absolute opacity-90 italic font-light top-[90vh] left-[5vw] drop-shadow-xl">
        {selectedImage.film}
      </span>
      {children}
    </main>
  );
}
