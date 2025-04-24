import React from "react";
import { ScrollSync } from "react-scroll-sync";

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <ScrollSync>
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </ScrollSync>
  );
};

export default Main;
