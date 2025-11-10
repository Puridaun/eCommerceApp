import { Checkbox } from "../ui/checkbox";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Label } from "../ui/label";

const ItemsFilters: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex flex-col ">
      <h1>Filters</h1>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-full flex-col gap-2"
      >
        <div className="flex items-center justify-between gap-4 ">
          <h4 className="text-sm font-semibold">Gender</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <IconChevronDown />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Men</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Women</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Unisex</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ItemsFilters;
