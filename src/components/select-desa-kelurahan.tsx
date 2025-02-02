"use client";
import { getOptionsDesaKelurahan } from "@/actions/wilayah-administratif";
import SelectSingle from "@/components/select-single";
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  isDisabled?: boolean;
  inputId?: string;
  value?: string | SingleValue<Option>;
  onChange?: (value: string | SingleValue<Option>) => void;
  kecamatan?: string | SingleValue<Option>;
}

const SelectDesaKelurahan = ({ kecamatan, ...props }: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] =
    useState<SingleValue<Option> | null>(null);

  useEffect(() => {
    let kecamatanId: string;
    // empty the options when kecamatan is changed
    setOptions([]);
    //also empty the value
    setSelectedValue(null); // Reset the selected value to null
    if (props.onChange) {
      props.onChange("");
    }
    if (kecamatan) {
      // check if kecamatan is a string or an object
      if (typeof kecamatan === "object") {
        kecamatanId = kecamatan.value;
      } else {
        kecamatanId = kecamatan;
      }

      console.log(kecamatan);
      const fetchOptions = async () => {
        if (!kecamatanId) {
          return;
        }
        const response = await getOptionsDesaKelurahan(kecamatanId);
        setOptions(response);
      };

      fetchOptions();
    }
  }, [kecamatan, props]);

  return (
    <SelectSingle
      {...props}
      value={selectedValue}
      options={options}
      onChange={(selected: SingleValue<Option>) => {
        setSelectedValue(selected); // Update selected value when a user selects an option
        if (props.onChange) {
          props.onChange(selected);
        }
      }}
    />
  );
};

export default SelectDesaKelurahan;
