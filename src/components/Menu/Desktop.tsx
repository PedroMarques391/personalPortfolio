import React from "react";
import { NavItems } from "./NavItems";

const Desktop = (): React.JSX.Element => {
  return (
    <ul className="hidden md:flex justify-center items-center gap-x-3">
      <NavItems href="/">Home</NavItems>
      <NavItems
        href={{ pathname: "/projects", query: { page: 1 }, scroll: false }}
      >
        Projetos
      </NavItems>
      <NavItems href="/about">Sobre Mim</NavItems>
      <NavItems href="/contact">Contato</NavItems>
    </ul>
  );
};

export default Desktop;
