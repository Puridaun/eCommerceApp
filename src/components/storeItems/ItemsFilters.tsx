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
import type { CheckedState } from "@radix-ui/react-checkbox";
import useProducts from "../../hooks/useProducts";
import type { Filters } from "../../context/types";

export type filterType = {
  name: string;
  options: string[];
};

const ItemsFilters: React.FC<{ filtersList: filterType[] }> = ({
  filtersList,
}) => {
  const { filters, setFilters } = useProducts();
  const [openedIndex, setOpenIndex] = React.useState<number[]>([]);

  const handleOpenedIndex = (index: number) => {
    if (openedIndex.includes(index))
      setOpenIndex((prev) => prev.filter((item) => item !== index));
  };

  const handleCheck = (
    event: CheckedState,
    checkedOption: string,
    filterProp: keyof Filters
  ) => {
    setFilters((prev: any) => {
      const prevValues = Array.isArray(prev[filterProp])
        ? prev[filterProp]
        : [];

      const newValues = event
        ? [...prevValues, checkedOption]
        : prevValues.filter((c: string) => c !== checkedOption);

      return {
        ...prev,
        [filterProp]: newValues,
      };
    });
  };

  return (
    <div className="w-[160px] flex flex-col ">
      <h1>Filters</h1>
      {filtersList?.map((filter: filterType, index: number) => (
        <Collapsible
          key={index}
          open={openedIndex.includes(index)}
          onOpenChange={() => handleOpenedIndex(index)}
          className="flex flex-col gap-2"
        >
          <div className="w-fit flex items-center justify-between gap-2 ">
            <h4 className="w-fit text-sm font-semibold">{filter.name}</h4>
            <CollapsibleTrigger asChild>
              <Button
                onClick={() => setOpenIndex((prev) => [...prev, index])}
                variant="ghost"
                size="icon"
                className="size-8"
              >
                {openedIndex.includes(index) ? (
                  <IconChevronUp />
                ) : (
                  <IconChevronDown />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-col gap-2">
            {filter.options.map((option: string, idx: number) => {
              const uniqueId = `${filter.name}-${idx}`;
              const filterProp = filter.name.toLowerCase(); //de inlocuit nu e ok
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Checkbox
                    id={uniqueId}
                    checked={
                      filters.category.includes(option) ||
                      filters.price.includes(option)
                    }
                    onCheckedChange={(event) =>
                      handleCheck(event, option, filterProp as keyof Filters)
                    }
                  />
                  <Label htmlFor={idx.toString()}>{option}</Label>
                </div>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default ItemsFilters;
