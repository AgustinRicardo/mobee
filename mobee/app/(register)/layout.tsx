import React from "react";
import Login from "./login/page";

type Props = {
  children: React.ReactNode;
};

export default function RegisterLayout({ children }: Props) {
  return (
    <main className="flex flex-row">
      <img src="#" alt="imagen" className="h-full w-[85vw]" />
      {children}
    </main>
  );
}
