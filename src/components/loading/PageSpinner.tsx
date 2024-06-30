import clsx from "clsx";

import Loader from "./Loader";

type Props = {
  isLoading: boolean;
};

export default function PageSpinner({ isLoading }: Props) {
  return (
    <div
      className={clsx("absolute inset-0 flex justify-center items-center bg-white/90 z-10", {
        hidden: !isLoading,
      })}
    >
      <Loader />
    </div>
  );
}
