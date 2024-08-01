import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  placeholder: string;
  items: string[];
  label: string;
  className?: string;
};
export default function CustomSelect({
  placeholder,
  items,
  label,
  className,
}: Props) {
  return (
    <Select>
      <SelectTrigger className={cn(`${className}`, "w-[180px]")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <SelectItem value={item.toLowerCase()}>{item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
