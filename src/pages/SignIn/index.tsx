import { useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import Toast from "@/components/Toast";
import { signIn } from "@/services/userAction";
import { validateEmail } from "@/utils/helpers";
import { useStore } from "@/context/Store";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();

  const { setAppState } = useStore();

  const initialFormData: FormData = { email: "", password: "" };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChangeFormData = (values: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const handleSignIn = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Email không đúng!" });
      return;
    }

    const res = await signIn(formData);

    if (res.isSuccess) {
      setAppState((prev) => ({ ...prev, user: res.user }));
      Toast({
        type: "success",
        message: res.message,
      });
      navigate("/");
    } else {
      setErrors({ ...errors, password: res.message });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mt-20 p-10 shadow-[0px_0px_10px_1px_rgb(0,0,0,0.1)] rounded-xl">
        <h1 className="mb-5 text-xl text-center uppercase font-bold">
          Đăng nhập
        </h1>

        <div className="flex flex-col text-sm">
          <div className="w-[300px]">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => {
                setErrors({ ...errors, email: "" });
                handleChangeFormData({ email: e.target.value });
              }}
              placeholder="Email"
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
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => {
                setErrors({ ...errors, password: "" });
                handleChangeFormData({ password: e.target.value });
              }}
              placeholder="Mật khẩu"
            />
            <p
              className={clsx("min-h-4 text-red-500 text-xs", {
                invisible: !errors.password,
              })}
            >
              {errors.password}
            </p>
          </div>

          <button
            type="button"
            className="mt-4 mb-2 py-2 px-5 bg-pink border border-pink rounded-lg text-sm text-white font-semibold hover:text-pink hover:bg-white disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-pink"
            disabled={!formData.email || !formData.password}
            onClick={handleSignIn}
          >
            Đăng nhập
          </button>

          <Link
            to="/sign-up"
            className="text-xs self-end text-pink font-medium"
          >
            Đăng ký tại đây
          </Link>
        </div>
      </div>
    </div>
  );
}