import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { type ReactNode } from "react";

const ProductsGrid: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {React.Children.map(children, (child) => (
            <Grid>{child}</Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ProductsGrid;
