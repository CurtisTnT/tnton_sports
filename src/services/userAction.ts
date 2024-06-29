import { apiClient2 } from "@/lib/apiClient";
import { User } from "./interface";
import { initialUser } from "./initialState";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const res = await apiClient2.get("/users");

    return res.data;
  } catch (error: any) {
    console.log(new Error(error));
    return [];
  }
};

export const signIn = async (args: {
  email: string;
  password: string;
}): Promise<{ isSuccess: boolean; message: string; user: User }> => {
  const allUsers = await getAllUsers();

  const exitUser = allUsers.find(({ email }) => args.email === email);

  if (exitUser) {
    return exitUser.password === args.password
      ? {
          isSuccess: true,
          message: "Đăng nhập thành công!",
          user: exitUser,
        }
      : {
          isSuccess: false,
          message: "Mật khẩu hoặn tài khoản không đúng! Vui lòng thử lại!",
          user: initialUser,
        };
  } else {
    return {
      isSuccess: false,
      message: "Tài khoản chưa tồn tại, vui lòng đăng ký tài khoản!",
      user: initialUser,
    };
  }
};

export const signUp = async (args: {
  email: string;
  name: string;
  phone_number: string;
  password: string;
}): Promise<{ isSuccess: boolean; message: string }> => {
  const allUsers = await getAllUsers();

  const exitUser = allUsers.find(({ email }) => args.email === email);

  if (exitUser) {
    return {
      isSuccess: false,
      message:
        "Tài khoản này đã được đăng ký, vui lòng chọn tài khoản khác hoặc đi tới đăng nhập!",
    };
  } else {
    try {
      await apiClient2.post("/users", args);

      return {
        isSuccess: true,
        message: "Đăng kí thành công!",
      };
    } catch (error: any) {
      console.log(new Error(error));
      return {
        isSuccess: false,
        message: "Không thể đăng kí, vui lòng thử lại!",
      };
    }
  }
};
