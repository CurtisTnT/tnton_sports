import { ToastOptions, toast } from "react-toastify";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

type Props = {
  message: string;
  type: "success" | "error";
};

export default function Toast({
  type,
  message,
  ...props
}: Props & ToastOptions) {
  const Content = () => (
    <>
      <div
        className={clsx("absolute top-0 left-0 h-full w-[5px]", {
          "bg-[#1FD286]": type === "success",
          "bg-[#F04438]": type === "error",
        })}
      />
      <div className="text-black space-y-1">
        <p className="font-bold capitalize">{type}</p>
        <p className="text-sm">{message}</p>
      </div>
    </>
  );

  return toast(Content(), {
    hideProgressBar: true,
    autoClose: 3000,
    bodyStyle: { padding: 8, marginRight: 20 },
    closeButton: ({ closeToast }) => (
      <button
        onClick={closeToast}
        className="w-5 h-5 flex justify-center items-center hover:opacity-50"
      >
        <IoClose size={18} className="w-[18px] h-[18px] text-black align-top" />
      </button>
    ),
    ...props,
  });
}
