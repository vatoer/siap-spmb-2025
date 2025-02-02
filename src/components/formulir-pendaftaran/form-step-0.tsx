"use client";

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
import { cn } from "@/lib/utils";
import { AkunBaruStep0, akunBaruStep0Schema } from "@/zod/schema/akun-baru";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface FormStep0Props {
  step: number;
  nextStep: () => void;
}

const FormStep0 = ({ step, nextStep }: FormStep0Props) => {
  const form = useForm<AkunBaruStep0>({
    resolver: zodResolver(akunBaruStep0Schema),
    defaultValues: {
      name: "",
      nisn: "",
      nik: "",
      jenjang: "SD",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: AkunBaruStep0) => {
    console.log(data);
    nextStep();
  };

  if (step !== 0) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pb-24">
          <FormField
            control={form.control}
            name="nisn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NISN</FormLabel>
                <FormControl>
                  <Input placeholder="10 digit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="nik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input placeholder="16 digit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jenjang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenjang</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="bg-background w-full border border-gray-300 rounded p-2"
                  >
                    <option value="">Pilih Jenjang</option>
                    <option value="SD">SD/MI Sederajat</option>
                    <option value="SMP">SMP/MTs Sederajat</option>
                    <option value="SMA">SMA/MA Sederajat </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className={cn(
              "flex flex-col sm:flex-row  sm:justify-end gap-2 mt-6"
            )}
          >
            <Button type="submit">Buat Akun</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormStep0;
