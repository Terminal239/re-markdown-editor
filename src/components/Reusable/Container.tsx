import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = ({ className, children }: Props) => {
  return <div className={clsx("flex flex-1 flex-col", className)}>{children}</div>;
};

export default Container;
