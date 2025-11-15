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

const ProductsFilter: React.FC<{ filterGroups: any }> = ({ filterGroups }) => {
  const { filters, setFilters, setFilteredProducts, products } = useProducts();
  const [openedIndex, setOpenIndex] = React.useState<number[]>([]);

  const handleSaveFilters = () => {
    if (filters.category.length > 0) {
      setFilteredProducts(() =>
        products.filter((item) => {
          return filters.category.includes(item.category);
        })
      );
    } else if (filters.price.length > 0) {
      const ranges = filters.price.map(priceRange);
      console.log(ranges);
      setFilteredProducts(() =>
        products.filter((item) =>
          ranges.some(
            ({ minPrice, maxPrice }) =>
              item.price >= minPrice && item.price <= maxPrice
          )
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleOpenedIndex = (index: number) => {
    if (openedIndex.includes(index))
      setOpenIndex((prev) => prev.filter((item) => item !== index));
  };

  const handleCheck = (
    event: CheckedState,
    checkedOption: string,
    filterProp: keyof Filters
  ) => {
    setFilters((prev: Filters) => ({
      ...prev,
      [filterProp]: event
        ? Array.isArray(prev[filterProp])
          ? [...prev[filterProp], checkedOption]
          : checkedOption
        : Array.isArray(prev[filterProp])
        ? prev[filterProp].filter((el: string) => el !== checkedOption)
        : "",
    }));
  };

  const priceRange = (string: string) => {
    if (string.includes("+")) {
      const minPrice = Number(string.replace("+", ""));
      return { minPrice, maxPrice: Infinity };
    } else {
      const [value1, value2] = string.split("-").map(Number);
      return {
        minPrice: Math.min(value1, value2),
        maxPrice: Math.max(value1, value2),
      };
    }
  };

  priceRange("500-700");

  return (
    <div className="w-[160px] flex flex-col ">
      <h1>Filters</h1>
      {filterGroups?.map((group: any, index: number) => (
        <Collapsible
          key={index}
          open={openedIndex.includes(index)}
          onOpenChange={() => handleOpenedIndex(index)}
          className="flex flex-col gap-2"
        >
          <div className="w-fit flex items-center justify-between gap-2 ">
            <h4 className="w-fit text-sm font-semibold">{group.groupName}</h4>
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
            {group.groupOptions.map((option: string, idx: number) => {
              const uniqueId = `${group.groupName}-${idx}`;
              const filterProp = group.groupName.toLowerCase();
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
      <Button
        className="my-4"
        variant="outline"
        onClick={() => {
          handleSaveFilters();
        }}
      >
        Save filters
      </Button>
    </div>
  );
};

export default ProductsFilter;
