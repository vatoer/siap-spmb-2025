import { dbSpmb } from "@/lib/db-siap-spmb";
import { hashPassword } from "@/utils/hashing/pbkdf2";
import { TRegister } from "@/zod/schema/register";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  const user = await dbSpmb.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const userCreate = async (data: TRegister): Promise<User> => {
  try {
    const password = await hashPassword(data.password);
    const user = await dbSpmb.user.create({
      data: {
        email: data.email,
        name: data.name,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
