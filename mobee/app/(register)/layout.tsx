import React from "react";
import Login from "./login/page";

type Props = {
  children: React.ReactNode;
};

export default function RegisterLayout({ children }: Props) {
  return (
    <main>
      <img src="#" alt="imagen" />
      {children}
    </main>
  );
}
