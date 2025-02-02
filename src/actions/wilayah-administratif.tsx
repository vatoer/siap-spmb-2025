"use server";

import {
  getDesaKelurahan,
  getKecamatan,
  getKotaKabupaten,
} from "@/data/wilayah-administratif/index";

export const getOptionsKotaKabupaten = async (provinsiId: string) => {
  const kotaKabupaten = await getKotaKabupaten(provinsiId);

  return kotaKabupaten.map((kotaKabupaten) => ({
    value: kotaKabupaten.id,
    label: kotaKabupaten.nama,
  }));
};

export const getOptionsKecamatan = async (kotaKabupatenId: string) => {
  const kecamatan = await getKecamatan(kotaKabupatenId);

  return kecamatan.map((kecamatan) => ({
    value: kecamatan.id,
    label: kecamatan.nama,
  }));
};

export const getOptionsDesaKelurahan = async (kecamatanId: string) => {
  const desaKelurahan = await getDesaKelurahan(kecamatanId);

  return desaKelurahan.map((desaKelurahan) => ({
    value: desaKelurahan.id,
    label: desaKelurahan.nama,
  }));
};
