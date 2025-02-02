"use client";
import { getOptionsKecamatan } from "@/actions/wilayah-administratif";
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
  kotaKabupaten?: string | SingleValue<Option>;
}

const SelectKecamatan = ({ kotaKabupaten, ...props }: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] =
    useState<SingleValue<Option> | null>(null);

  useEffect(() => {
    let kotaKabupatenId: string;
    // empty the options when kotaKabupaten is changed
    setOptions([]);
    //also empty the value
    setSelectedValue(null); // Reset the selected value to null
    if (props.onChange) {
      props.onChange("");
    }
    if (kotaKabupaten) {
      // check if kotaKabupaten is a string or an object
      if (typeof kotaKabupaten === "object") {
        kotaKabupatenId = kotaKabupaten.value;
      } else {
        kotaKabupatenId = kotaKabupaten;
      }

      console.log(kotaKabupaten);
      const fetchOptions = async () => {
        if (!kotaKabupatenId) {
          return;
        }
        const response = await getOptionsKecamatan(kotaKabupatenId);
        setOptions(response);
      };

      fetchOptions();
    }
  }, [kotaKabupaten, props]);

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

export default SelectKecamatan;
