import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { signUp } from "@/services/userAction";
import { validateEmail, validatePhoneNumber } from "@/utils/helpers";
import Toast from "@/components/Toast";

type FormData = {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp() {
  const navigate = useNavigate();

  const initialFormData: FormData = {
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{
    passwordConfirmation: string;
    phoneNumber: string;
    email: string;
  }>({ passwordConfirmation: "", phoneNumber: "", email: "" });

  const handleChangeFormData = (values: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const handleSignUp = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Email không đúng!" });
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors({ ...errors, phoneNumber: "Số điện thoại không đúng!" });
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      setErrors({
        ...errors,
        passwordConfirmation: "Mật khẩu nhập lại không đúng!",
      });
      return;
    }

    const res = await signUp({
      ...formData,
      phone_number: formData.phoneNumber,
    });

    if (res.isSuccess) {
      Toast({ type: "success", message: res.message });
      navigate("/sign-in");
    } else {
      setErrors({ ...errors, passwordConfirmation: res.message });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mt-20 p-10 shadow-[0px_0px_10px_1px_rgb(0,0,0,0.1)] rounded-xl">
        <h1 className="mb-5 text-xl text-center uppercase font-bold">
          Đăng kí
        </h1>

        <p className="self-center mb-5 text-center text-xs font-medium">
          Đã có tài khoản{" "}
          <Link to="/sign-in" className="text-pink">
            đăng nhập tại đây
          </Link>
          .
        </p>

        <div className="flex flex-col text-sm">
          <input
            type="text"
            className="w-[300px] mb-4 px-4 py-2 border rounded-lg"
            value={formData.name}
            onChange={(e) => handleChangeFormData({ name: e.target.value })}
            placeholder="Nhập tên của bạn"
          />
          <div className="w-[300px]">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => {
                handleChangeFormData({ email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              placeholder="Nhập email của bạn"
            />
            <p
              className={clsx("min-h-4 text-red-500 text-xs", {
                invisible: !errors.email,
              })}
            >
              {errors.email}
            </p>
          </div>
          <div className="w-[300px]">
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.phoneNumber}
              onChange={(e) => {
                handleChangeFormData({ phoneNumber: e.target.value });
                setErrors({ ...errors, phoneNumber: "" });
              }}
              placeholder="Số điện thoại"
            />
            <p
              className={clsx("min-h-4 text-red-500 text-xs", {
                invisible: !errors.phoneNumber,
              })}
            >
              {errors.phoneNumber}
            </p>
          </div>
          <input
            type="password"
            className="w-[300px] mb-4 px-4 py-2 border rounded-lg"
            value={formData.password}
            onChange={(e) => handleChangeFormData({ password: e.target.value })}
            placeholder="Mật khẩu"
          />
          <div className="w-[300px]">
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.passwordConfirmation}
              onChange={(e) => {
                handleChangeFormData({ passwordConfirmation: e.target.value });
                setErrors({ ...errors, passwordConfirmation: "" });
              }}
              placeholder="Nhập lại mật khẩu"
            />
            <p
              className={clsx("min-h-4 text-red-500 text-xs", {
                invisible: !errors.passwordConfirmation,
              })}
            >
              {errors.passwordConfirmation}
            </p>
          </div>

          <button
            type="button"
            className="mt-4 py-2 px-5 bg-pink border border-pink rounded-lg text-sm text-white font-semibold hover:text-pink hover:bg-white disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-pink"
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.phoneNumber ||
              !formData.password ||
              !formData.passwordConfirmation
            }
            onClick={handleSignUp}
          >
            Đăng kí
          </button>
        </div>
      </div>
    </div>
  );
}
