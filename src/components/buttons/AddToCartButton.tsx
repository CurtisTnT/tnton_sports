import clsx from "clsx";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function AddToCartButton(props: Props) {
  const { onClick, className } = props;

  return (
    <button
      type="button"
      className={clsx(
        "py-2 px-5 bg-[#ffb916] border border-[#ffb916] rounded-lg text-sm text-white font-semibold hover:text-[#ffb916] hover:bg-white",
        className
      )}
      onClick={onClick}
    >
      Thêm vào giỏ hàng
    </button>
  );
}
