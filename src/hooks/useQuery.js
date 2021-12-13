import React from "react";
import { useLocation } from "react-router-dom";

// custom hook to parse client url query string
export default function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
