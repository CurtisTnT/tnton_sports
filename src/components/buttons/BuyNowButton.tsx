import clsx from "clsx";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function BuyNowButton(props: Props) {
  const { onClick, className } = props;

  return (
    <button
      type="button"
      className={clsx(
        "py-2 px-5 bg-pink border border-pink rounded-lg text-sm text-white font-semibold hover:text-pink hover:bg-white",
        className
      )}
      onClick={onClick}
    >
      Mua ngay
    </button>
  );
}
