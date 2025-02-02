import Select, { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

const csv = `
id;nama
11;ACEH
12;"SUMATERA UTARA"
13;"SUMATERA BARAT"
14;RIAU
15;JAMBI
16;"SUMATERA SELATAN"
17;BENGKULU
18;LAMPUNG
19;"KEPULAUAN BANGKA BELITUNG"
21;"KEPULAUAN RIAU"
31;"DKI JAKARTA"
32;"JAWA BARAT"
33;"JAWA TENGAH"
34;"DAERAH ISTIMEWA YOGYAKARTA"
35;"JAWA TIMUR"
36;BANTEN
51;BALI
52;"NUSA TENGGARA BARAT"
53;"NUSA TENGGARA TIMUR"
61;"KALIMANTAN BARAT"
62;"KALIMANTAN TENGAH"
63;"KALIMANTAN SELATAN"
64;"KALIMANTAN TIMUR"
65;"KALIMANTAN UTARA"
71;"SULAWESI UTARA"
72;"SULAWESI TENGAH"
73;"SULAWESI SELATAN"
74;"SULAWESI TENGGARA"
75;GORONTALO
76;"SULAWESI BARAT"
81;MALUKU
82;"MALUKU UTARA"
91;PAPUA
92;"PAPUA BARAT"
93;"PAPUA SELATAN"
94;"PAPUA TENGAH"
95;"PAPUA PEGUNUNGAN"
`;

const optionsProvinsi: Option[] = csv
  .trim()
  .split("\n")
  .slice(1) // Skip the header
  .map((line) => {
    const [value, label] = line.split(";");
    if (!value || !label) {
      throw new Error(`Invalid CSV line: ${line}`);
    }
    return {
      value: value.trim(),
      label: label.trim().replace(/(^"|"$)/g, ""), // Remove surrounding quotes
    };
  });

export { optionsProvinsi };

interface SelectProps {
  isDisabled?: boolean;
  inputId?: string;
  options?: Option[];
  value?: string | SingleValue<Option>;
  onChange?: (value: string | SingleValue<Option>) => void;
}

export const SelectProvinsi = ({
  isDisabled = false,
  inputId,
  options = optionsProvinsi,
  value,
  onChange,
}: SelectProps) => {
  // If value is a string, find the corresponding object in options
  const selectedValue =
    typeof value === "string"
      ? options.find((option) => option.value === value) || null
      : value;

  const instanceId = inputId ?? Math.random().toString(36).substring(7);

  return (
    <Select
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      inputId={inputId}
      //id={inputId}
      isDisabled={isDisabled}
      instanceId={instanceId}
      options={options}
      value={selectedValue}
      onChange={onChange}
      isClearable={true}
    />
  );
};

export default SelectProvinsi;
