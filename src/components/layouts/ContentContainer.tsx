import { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

export default function ContentContainer({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <section className={clsx("flex flex-col items-center my-5", className)}>
      <div className="w-[1200px]">{children}</div>
    </section>
  );
}
