import React from "react";
import ItemsGrid from "./ItemsGrid";
import { OpenedItemCard } from "./OpenedItemCard";
import ItemsFilters from "./ItemsFilters";

const ItemsDashboard: React.FC = () => {
  return (
    <div className="w-full flex gap-10">
      <ItemsFilters />
      <ItemsGrid numberOfItems={10}>
        <OpenedItemCard
          price={64}
          title={"Running Shoes"}
          imgUrl={"Athletic_Running_Shoes.jpg"}
        />
      </ItemsGrid>
    </div>
  );
};

export default ItemsDashboard;
