import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return debouncedValue;
};

export default useDebounce;
