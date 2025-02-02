import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, {
      message: "name is too short, must be at least 3 characters long",
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "password is too short, must be at least 8 characters long",
    }),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    let message = "";

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    if (countOfLowerCase < 1) {
      message += "add lowercase, ";
    }
    if (countOfUpperCase < 1) {
      message += "add uppercase, ";
    }
    if (countOfSpecialChar < 1) {
      message += "add special char, ";
    }
    if (countOfNumbers < 1) {
      message += "add number, ";
    }

    if (message.length > 0) {
      console.log("password does not meet complexity requirements");
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: message.replace(/,\s*$/, ""),
      });
    }
  });

export type TRegister = z.infer<typeof RegisterSchema>;
