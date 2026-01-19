import { useContext } from "react";
import { ResponsiveContext } from "../context/ResponsiveContext";

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);

  if (!context) {
    throw new Error("useResponsive must be used within an ResponsiveProvider");
  }

  return context;
};
