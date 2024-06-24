import clsx from "clsx";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export type Pagination = {
  currentPage: number;
  hasNextPage: boolean;
  onNavigate: (page: number) => void;
  className?: string;
};

export default function PaginationComponent(props: Pagination) {
  const { currentPage, hasNextPage, onNavigate, className } = props;

  return (
    <div className={clsx("flex justify-center gap-1 py-2", className)}>
      {currentPage > 1 && (
        <button
          type="button"
          className="py-1 px-2.5 border border-pink rounded text-pink text-sm hover:bg-pink hover:text-white"
          onClick={() => onNavigate(currentPage - 1)}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </button>
      )}
      {currentPage > 1 && (
        <button
          type="button"
          className="py-1 px-2.5 border border-pink rounded text-pink text-sm hover:bg-pink hover:text-white"
          onClick={() => onNavigate(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}
      <button
        type="button"
        className="py-1 px-2.5 border border-pink rounded text-white text-sm bg-pink"
      >
        {currentPage}
      </button>
      {hasNextPage && (
        <button
          type="button"
          className="py-1 px-2.5 border border-pink rounded text-pink text-sm hover:bg-pink hover:text-white"
          onClick={() => onNavigate(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}
      {hasNextPage && (
        <button
          type="button"
          className="py-1 px-2.5 border border-pink rounded text-pink text-sm hover:bg-pink hover:text-white"
          onClick={() => onNavigate(currentPage + 1)}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </button>
      )}
    </div>
  );
}
