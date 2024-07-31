import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Summary({
  children,
  summary,
}: {
  children: React.ReactNode;
  summary: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <p>{summary}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
