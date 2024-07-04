import { useEffect, useState } from "react";
import clsx from "clsx";
import emailjs from "emailjs-com";

import ContentContainer from "@/components/layouts/ContentContainer";
import ComponentSpinner from "@/components/loading/ComponentSpinner";
import { useStore } from "@/context/Store";

type FormData = {
  name: string;
  phone: string;
  email: string;
  content: string;
};

export default function Contact() {
  const {
    appState: { user },
  } = useStore();

  const initialFormData: FormData = {
    name: "",
    phone: "",
    email: "",
    content: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone: string; email: string }>({
    phone: "",
    email: "",
  });

  const handleChangeFormData = (values: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const handleSubmitEmail = () => {
    setLoading(true);
    emailjs
      .send(
        "service_9q52aul",
        "template_9ij5x58",
        formData,
        "4NTXkk8jhLbtyZrmI"
      )
      .then(() => {
        setFormData(initialFormData);
        setLoading(false);
        alert("Email sent successfully");
      })
      .catch((error) => {
        setLoading(false);
        alert("Error sending email: " + error);
      });
  };

  useEffect(() => {
    if (user.id) {
      const { name, email, phone_number } = user;
      handleChangeFormData({ name, email, phone: phone_number });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <ContentContainer>
      <div className="flex flex-col mt-10 items-center">
        <ComponentSpinner isLoading={loading}>
          <h1 className="text-xl uppercase font-bold">Liên hệ với chúng tôi</h1>

          <form
            className="my-5 flex flex-col text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitEmail();
            }}
          >
            <input
              type="text"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => handleChangeFormData({ name: e.target.value })}
              placeholder="Họ và tên"
            />
            <div className="flex items-center gap-4">
              <div className="w-[300px]">
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) => {
                    handleChangeFormData({ phone: e.target.value });
                    setErrors({ ...errors, phone: "" });
                  }}
                  placeholder="Số điện thoại"
                />
                <p
                  className={clsx("min-h-4 text-red-500 text-xs", {
                    invisible: !errors.phone,
                  })}
                >
                  {errors.phone}
                </p>
              </div>
              <div className="w-[300px]">
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={(e) => {
                    handleChangeFormData({ email: e.target.value });
                    setErrors({ ...errors, email: "" });
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
            </div>

            <textarea
              className="w-full min-h-[100px] mb-4 px-4 py-2 border rounded-lg"
              value={formData.content}
              onChange={(e) =>
                handleChangeFormData({ content: e.target.value })
              }
              placeholder="Nội dung"
            />

            <button
              type="submit"
              className="self-center py-2 px-5 rounded bg-pink text-white font-bold hover:scale-110 duration-300 disabled:opacity-50 disabled:hover:text-white disabled:hover:bg-pink"
              disabled={
                !formData.content ||
                !formData.email ||
                !formData.name ||
                !formData.phone
              }
            >
              Gửi thông tin
            </button>
          </form>
        </ComponentSpinner>
      </div>
    </ContentContainer>
  );
}
