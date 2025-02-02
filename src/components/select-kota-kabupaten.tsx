"use client";
import { getOptionsKotaKabupaten } from "@/actions/wilayah-administratif";
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
  provinsi?: string | SingleValue<Option>;
}

const SelectKotaKabupaten = ({ provinsi, ...props }: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] =
    useState<SingleValue<Option> | null>(null);

  useEffect(() => {
    let propinsiId: string;
    // empty the options when provinsi is changed
    setOptions([]);
    //also empty the value
    setSelectedValue(null); // Reset the selected value to null
    if (props.onChange) {
      props.onChange("");
    }
    if (provinsi) {
      // check if provinsi is a string or an object
      if (typeof provinsi === "object") {
        propinsiId = provinsi.value;
      } else {
        propinsiId = provinsi;
      }

      console.log(provinsi);
      const fetchOptions = async () => {
        if (!propinsiId) {
          return;
        }
        const response = await getOptionsKotaKabupaten(propinsiId);
        setOptions(response);
      };

      fetchOptions();
    }
  }, [provinsi, props]);

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

export default SelectKotaKabupaten;
