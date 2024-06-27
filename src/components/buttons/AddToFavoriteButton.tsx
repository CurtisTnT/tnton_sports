import clsx from "clsx";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function AddToFavoriteButton(props: Props) {
  const { onClick, className } = props;

  return (
    <button
      type="button"
      className={clsx(
        "py-2 px-5 bg-[#E95221] border border-[#E95221] rounded-lg text-sm text-white font-semibold hover:text-[#E95221] hover:bg-white",
        className
      )}
      onClick={onClick}
    >
      Thêm vào yêu thích
    </button>
  );
}
