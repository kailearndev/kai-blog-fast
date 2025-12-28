import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTags } from "@/hooks/tag/useTag";
import type { ITags } from "@/types/post-type";

interface SelectTagProps {
  // Định nghĩa onChange trả về đúng cấu trúc của Zod schema
  onChange: (value: ITags[]) => void;
  defaultValue?: string;
}

const SelectTag = ({ onChange, defaultValue }: SelectTagProps) => {
  const { data } = useTags();
  const tags = data?.data || [];

  const handleValueChange = (selectedId: string) => {
    // Tìm object trong danh sách gốc
    const targetTag = tags.find((t) => t.id === selectedId);

    if (targetTag) {
      // Trả về mảng chứa object theo đúng format Zod yêu cầu
      onChange([
        {
          id: targetTag.id,
          name: targetTag.name,
        },
      ]);
    } else {
      onChange([]);
    }
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn thẻ..." />
      </SelectTrigger>
      <SelectContent>
        {tags.map((tag) => (
          <SelectItem key={tag.id} value={tag.id}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectTag;
