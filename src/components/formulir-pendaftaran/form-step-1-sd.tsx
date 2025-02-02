"use client";

import MapDomisili, { MarkerPosition } from "@/components/map/map-domisili";
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
import {
  AkunBaruJenjangSDStep1,
  akunBaruJenjangSDStep1Schema,
} from "@/zod/schema/akun-baru";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface FormStep1SDProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
}

const FormStep1SD = ({ step, prevStep, nextStep }: FormStep1SDProps) => {
  const form = useForm<AkunBaruJenjangSDStep1>({
    resolver: zodResolver(akunBaruJenjangSDStep1Schema),
    defaultValues: {
      npsn: "",
      sekolahAsal: "",
      tahunLulus: 2021,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: AkunBaruJenjangSDStep1) => {
    console.log(data);
    nextStep();
  };

  const handleMarkerDragEnd = (markerPosition: MarkerPosition) => {
    console.log(markerPosition);
  };

  const onPrev = () => {
    prevStep();
  };

  if (step !== 1) {
    return null;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="npsn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPSN</FormLabel>
                <FormControl>
                  <Input placeholder="8 digit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sekolahAsal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sekolah Asal</FormLabel>
                <FormControl>
                  <Input placeholder="Sekolah Asal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tahunLulus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Lulus</FormLabel>
                <FormControl>
                  <Input placeholder="2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MapDomisili onMarkerDragEnd={handleMarkerDragEnd} />

          <div
            className={cn(
              "flex flex-col sm:flex-row  sm:justify-end gap-2 mt-6"
            )}
          >
            <Button type="button" variant={"outline"} onClick={onPrev}>
              Sebelumny
            </Button>
            <Button type="submit">Selanjutnya</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormStep1SD;
