import { Checkbox } from "../ui/checkbox";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Label } from "../ui/label";

export type filter = {
  name: string;
  options: string[];
};

const ItemsFilters: React.FC<{ filters: filter[] }> = ({ filters }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-[160px] flex flex-col ">
      <h1>Filters</h1>
      {filters?.map((filter: filter) => (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex flex-col gap-2"
        >
          <div className="w-fit flex items-center justify-between gap-2 ">
            <h4 className="w-fit text-sm font-semibold">{filter.name}</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                {isOpen ? <IconChevronUp /> : <IconChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            {filter.options.map((option: string, j: number) => (
              <div key={j} className="flex items-center gap-3">
                <Checkbox id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default ItemsFilters;
