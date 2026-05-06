import { useState, useEffect } from "react";

export function useBreakpointItems(lgItems = 3, mdItems = 4) {
  const getItems = () => (window.innerWidth >= 1024 ? lgItems : mdItems);

  const [itemsPerPage, setItemsPerPage] = useState(lgItems); // SSR-safe default

  useEffect(() => {
    const update = () => setItemsPerPage(getItems());
    update(); // set on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerPage;
}
