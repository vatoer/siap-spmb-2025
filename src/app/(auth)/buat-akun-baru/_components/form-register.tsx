"use client";

import { register } from "@/app/(auth)/_actions/register";
import GoogleSignInButton from "@/components/google-sign-in-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AkunBaru, akunBaruSchema } from "@/zod/schema/akun-baru";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const FormRegister = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AkunBaru>({
    resolver: zodResolver(akunBaruSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { handleSubmit } = form;
  const { toast } = useToast();

  const onSubmit = async (data: AkunBaru) => {
    startTransition(async () => {
      const registerReponse = await register(data);
      if (registerReponse?.success) {
        console.log("User created");
      } else {
        console.log("Error creating user");
        console.log(registerReponse);
        toast({
          title: "Error",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="nama" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Konfirmasi Password"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row  sm:justify-end gap-2 pt-6">
            <Button className=" w-full py-6" type="submit">
              <span>Buat Akun</span>
              {isPending && (
                <Loader className="ml-2 spin-in" size={24} color="white" />
              )}
            </Button>
          </div>
          <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0 text-gray-500">
              atau
            </p>
          </div>
          <GoogleSignInButton text="Login dengan Google" />
        </form>
      </Form>
    </div>
  );
};

export default FormRegister;
