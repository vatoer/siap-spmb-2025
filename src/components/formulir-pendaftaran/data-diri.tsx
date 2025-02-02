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
  DataDiri,
  dataDiriSchema,
  JenjangDikdasmen,
} from "@/zod/schema/peserta-didik";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
// import { SelectProvinsi } from "@/components/select-provinsi";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// import SelectDesaKelurahan from "../select-desa-kelurahan";
// import SelectKecamatan from "../select-kecamatan";

const SelectProvinsi = dynamic(() => import("@/components/select-provinsi"), {
  ssr: false,
  loading: () => <p>Loading provinsi...</p>,
});

const SelectKotaKabupaten = dynamic(
  () => import("@/components/select-kota-kabupaten"),
  {
    ssr: false,
    loading: () => <p>Loading provinsi...</p>,
  }
);

const SelectKecamatan = dynamic(() => import("@/components/select-kecamatan"), {
  ssr: false,
  loading: () => <p>Loading provinsi...</p>,
});

const SelectDesaKelurahan = dynamic(
  () => import("@/components/select-desa-kelurahan"),
  {
    ssr: false,
    loading: () => <p>Loading provinsi...</p>,
  }
);

interface FormDataDiriProps {
  nextStep?: () => void;
}

const FormDataDiri = ({ nextStep = () => {} }: FormDataDiriProps) => {
  const form = useForm<DataDiri>({
    resolver: zodResolver(dataDiriSchema),
    defaultValues: {
      nama: "",
      nisn: "",
      nik: "",
      jenjangDikdasmen: JenjangDikdasmen.SD,
      alamat: "",
      rt: "",
      rw: "",
      kelurahan: "",
      kecamatan: "",
      kotaKabupaten: "",
      provinsi: "",
    },
  });

  const { handleSubmit, watch } = form;

  const provinsi = watch("provinsi");
  const kotaKabupaten = watch("kotaKabupaten");
  const kecamatan = watch("kecamatan");

  const onSubmit = (data: DataDiri) => {
    console.log(data);
    nextStep();
  };

  useEffect(() => {
    console.log(provinsi);
  }, [provinsi]);

  return (
    <div className="flex flex-col w-full items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-2 pb-24"
        >
          <h1 className="text-lg">Data Diri</h1>

          <FormField
            control={form.control}
            name="nisn"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>NISN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10 digit"
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
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
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
            name="nik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input
                    placeholder="16 digit"
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
            name="jenjangDikdasmen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenjang</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="custom-select w-full rounded p-2"
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

          <div className="h-0 py-4 border-b-2"></div>

          <h1 className="text-lg pt-4">Domisili</h1>

          <FormField
            control={form.control}
            name="statusDomisili"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Domisili</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className=" w-full custom-select rounded p-2"
                  >
                    <option value="">Pilih Status Domisili</option>
                    <option value="SESUAI_KK">Sesuai Kartu Keluarga</option>
                    <option value="SURAT_PINDAH">Surat Pindah</option>
                    <option value="SESUAI_DOMISILI_PONDOK">
                      Sesuai Domisili Pondok
                    </option>
                    <option value="SESUAI_DOMISILI_PANTIASUHAN">
                      Sesuai Domisili Panti Asuhan
                    </option>
                    <option value="LAINNYA">Lainnya</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="provinsi"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <Label htmlFor="select-provinsi">Provinsi</Label>
                  <FormControl>
                    <SelectProvinsi
                      inputId="select-provinsi"
                      value={field.value}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kotaKabupaten"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel htmlFor="select-kota-kabupaten">
                    Kota/Kabupaten
                  </FormLabel>
                  <FormControl>
                    <SelectKotaKabupaten
                      inputId="select-kota-kabupaten"
                      value={field.value}
                      provinsi={provinsi}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="kecamatan"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Kecamatan</FormLabel>
                  <FormControl>
                    <SelectKecamatan
                      value={field.value}
                      kotaKabupaten={kotaKabupaten}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kelurahan"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Desa/ Kelurahan</FormLabel>
                  <FormControl>
                    <SelectDesaKelurahan
                      value={field.value}
                      kecamatan={kecamatan}
                      onChange={(selected) => {
                        let value = "";
                        if (typeof selected === "object" && selected) {
                          value = selected.value;
                        } else {
                          value = selected ?? "";
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="alamat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Domisili</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jl... Komplek... Blok..."
                    {...field}
                    className="custom-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="rt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RT</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000"
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
              name="rw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RW</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000"
                      {...field}
                      className="custom-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

export default FormDataDiri;
