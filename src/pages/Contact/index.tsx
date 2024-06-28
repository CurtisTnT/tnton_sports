import { useState } from "react";
import emailjs from "emailjs-com";

import ContentContainer from "@/components/layouts/ContentContainer";

type FormData = {
  name: string;
  phone: string;
  email: string;
  content: string;
};

export default function Contact() {
  const initialFormData: FormData = {
    name: "",
    phone: "",
    email: "",
    content: "",
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChangeFormData = (values: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const handleSubmitEmail = () => {
    emailjs
      .send(
        "service_9q52aul",
        "template_9ij5x58",
        formData,
        "4NTXkk8jhLbtyZrmI"
      )
      .then(() => {
        setFormData(initialFormData);
        alert("Email sent successfully");
      })
      .catch((error) => {
        alert("Error sending email: " + error);
      });
  };

  return (
    <ContentContainer>
      <div className="flex flex-col mt-10 items-center">
        <h1 className="text-xl uppercase font-bold">Liên hệ với chúng tôi</h1>

        <div className="my-5 flex flex-col gap-3 text-sm">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.name}
            onChange={(e) => handleChangeFormData({ name: e.target.value })}
            placeholder="Họ và tên"
          />

          <div className="flex items-center gap-4">
            <input
              type="tel"
              className="w-[300px] px-4 py-2 border rounded-lg"
              value={formData.phone}
              onChange={(e) => handleChangeFormData({ phone: e.target.value })}
              placeholder="Điện thoại"
            />
            <input
              type="email"
              className="w-[300px] px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => handleChangeFormData({ email: e.target.value })}
              placeholder="Email"
            />
          </div>

          <textarea
            className="w-full min-h-[100px] px-4 py-2 border rounded-lg"
            value={formData.content}
            onChange={(e) => handleChangeFormData({ content: e.target.value })}
            placeholder="Nội dung"
          />

          <button
            type="submit"
            className="self-center p-2 rounded bg-pink text-white font-bold hover:scale-110 duration-300"
            onClick={handleSubmitEmail}
          >
            Gửi thông tin
          </button>
        </div>
      </div>
    </ContentContainer>
  );
}
