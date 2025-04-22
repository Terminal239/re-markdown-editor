import React from "react";

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return <main className="flex flex-1">{children}</main>;
};

export default Main;
