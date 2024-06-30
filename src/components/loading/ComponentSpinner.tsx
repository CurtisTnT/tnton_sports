import { PropsWithChildren } from "react";
import clsx from "clsx";

import Loader from "./Loader";

type Props = {
  isLoading: boolean;
  className?: string;
};

export default function ComponentSpinner(props: PropsWithChildren<Props>) {
  const { isLoading, className, children } = props;

  return (
    <div className={clsx("relative", className)}>
      {children}
      <div
        className={clsx(
          "absolute top-0 flex w-full h-full justify-center items-center bg-white/90 z-10",
          {
            hidden: !isLoading,
          }
        )}
      >
        <Loader />
      </div>
    </div>
  );
}
