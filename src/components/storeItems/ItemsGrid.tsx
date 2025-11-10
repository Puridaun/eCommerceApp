import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { type ReactNode } from "react";

const ItemsGrid: React.FC<{ children: ReactNode; numberOfItems: number }> = ({
  children,
  numberOfItems,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(numberOfItems)).map((_, index) => (
          <Grid key={index}>{children}</Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsGrid;
