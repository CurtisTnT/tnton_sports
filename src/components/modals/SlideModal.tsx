import { Fragment, PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";

type Props = {
  isOpenModal: boolean;
  onCloseModal: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function SlideModal(props: PropsWithChildren<Props>) {
  const { isOpenModal, onCloseModal, header, footer, size, children } = props;

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" open={isOpenModal} onClose={onCloseModal}>
        <div className="fixed inset-0 bg-[black]/60 z-[999]">
          <div className={clsx("flex items-start justify-end min-h-screen")}>
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel
                as="div"
                className={clsx(
                  "relative bg-white shadow border-0 w-full min-h-screen antialiased",
                  {
                    "max-w-xl": size === "sm",
                    "max-w-3xl": size === "md",
                    "max-w-5xl": size === "lg",
                  }
                  // modalStyle
                )}
              >
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="absolute z-10 top-3 right-3 hover:opacity-80"
                >
                  <IoClose size={20} />
                </button>

                {header && <div className="p-5 border-b">{header}</div>}

                <div className="p-5">{children}</div>

                {footer && <div className="p-5 border-t">{footer}</div>}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
