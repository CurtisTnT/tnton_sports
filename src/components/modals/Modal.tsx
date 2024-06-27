/* eslint-disable react-refresh/only-export-components */
"use client";
import React, {
  useState,
  Fragment,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  TransitionClasses,
} from "@headlessui/react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

import ComponentSpinner from "@/components/loading/ComponentSpinner";

type Props = {
  onClose?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  transition?: TransitionClasses;
  position?: "top" | "center" | "bottom";
  size?: "sm" | "md" | "lg";
  modalStyle?: string;
};

export type ModalRef = {
  open: () => void;
  close: () => void;
  setLoading: (loading: boolean) => void;
};

function Modal(props: PropsWithChildren<Props>, forwardRef: Ref<ModalRef>) {
  const {
    onClose,
    header,
    footer,
    transition = {
      enter: "ease-out duration-300",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "ease-in duration-200",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
    },
    position = "center",
    size,
    modalStyle,
    children,
  } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const handleClose = () => {
    onClose && onClose();
    setIsOpenModal(false);
  };

  useImperativeHandle(forwardRef, () => ({
    open: () => setIsOpenModal(true),
    close: () => setIsOpenModal(false),
    setLoading: (loading: boolean) => setModalLoading(loading),
  }));

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" open={isOpenModal} onClose={handleClose}>
        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
          <div
            className={clsx(
              "flex items-start justify-center min-h-screen px-4",
              {
                "items-center": position === "center",
                "items-end": position === "bottom",
              }
            )}
          >
            <TransitionChild as={Fragment} {...transition}>
              <DialogPanel
                as="div"
                className={clsx(
                  "relative bg-white shadow border-0 p-0 rounded-[5px] w-full my-8 antialiased overflow-hidden",
                  {
                    "max-w-xl": size === "sm",
                    "max-w-3xl": size === "md",
                    "max-w-5xl": size === "lg",
                  },
                  modalStyle
                )}
              >
                <ComponentSpinner isLoading={modalLoading}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute z-10 top-3 right-3 hover:opacity-80"
                  >
                    <IoClose size={20} />
                  </button>

                  {header}

                  {children}

                  {footer}
                </ComponentSpinner>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default forwardRef(Modal);
