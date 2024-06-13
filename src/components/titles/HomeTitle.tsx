import clsx from "clsx";

type Props = {
  title: string;
  className?: string;
};

export default function HomeTitle(props: Props) {
  const { title, className } = props;

  return (
    <div className={clsx("flex justify-center my-4", className)}>
      <div>
        <h2 className="px-5 text-pink text-4xl font-bold translate-y-3">
          {title}
        </h2>
        <div className="h-3 bg-white-yellow/40 rounded-tr-lg rounded-tl-lg" />
      </div>
    </div>
  );
}
