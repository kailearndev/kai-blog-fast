import { MultiSelect } from "@/components/multi-select";
import { useTags } from "@/hooks/tag/useTag";

interface SelectTagProps {
  // Định nghĩa onChange trả về đúng cấu trúc của Zod schema
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
}

const SelectTag = ({ onValueChange, defaultValue }: SelectTagProps) => {
  const { data } = useTags();
  const options = data
    ? data.data.map((tag) => ({
        label: tag.name,
        value: tag.id,
      }))
    : [];
  return (
    <MultiSelect
      maxCount={5}
      singleLine={true}
      options={options}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    />
  );
};

export default SelectTag;
