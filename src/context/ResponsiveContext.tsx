import React, { createContext, useEffect, useState } from "react";

interface ResponsiveContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const ResponsiveContext = createContext<
  ResponsiveContextType | undefined
>(undefined);

const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 769px) and (max-width: 1024px)"
    );
    const desktopQuery = window.matchMedia("(min-width: 1025px)");

    const handleResize = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
      setIsDesktop(desktopQuery.matches);
    };

    handleResize();

    mobileQuery.addEventListener("change", handleResize);
    tabletQuery.addEventListener("change", handleResize);
    desktopQuery.addEventListener("change", handleResize);

    return () => {
      mobileQuery.removeEventListener("change", handleResize);
      tabletQuery.removeEventListener("change", handleResize);
      desktopQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
