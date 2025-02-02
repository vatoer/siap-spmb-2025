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
import {
  DataSekolahAsal,
  dataSekolahAsalSchema,
} from "@/zod/schema/peserta-didik";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

interface FormDataSekolahAsalProps {
  nextStep?: () => void;
}

const FormDataSekolahAsal = ({
  nextStep = () => {},
}: FormDataSekolahAsalProps) => {
  const form = useForm<DataSekolahAsal>({
    resolver: zodResolver(dataSekolahAsalSchema),
    defaultValues: {
      NPSN: "",
      namaSekolah: "",
      alamatSekolah: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: DataSekolahAsal) => {
    console.log(data);
    nextStep();
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-2 pb-24"
        >
          <h1 className="text-lg">Data Ayah</h1>
          <FormField
            control={form.control}
            name="NPSN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPSN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nama"
                    {...field}
                    className="custom-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="namaSekolah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SD/MI/SMP/MTs/SMA/MA/SMK Indonesia Emas"
                    {...field}
                    value={field.value ?? ""}
                    className="custom-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alamatSekolah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Kartu Keluarga</FormLabel>
                <FormControl>
                  <Input
                    placeholder="16 digit"
                    {...field}
                    value={field.value ?? ""}
                    className="custom-input"
                  />
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
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormDataSekolahAsal;
