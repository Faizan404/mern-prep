import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearInterval(timer);
  }, [value, delay]);

  return debounceValue;
}
