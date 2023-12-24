import { useState, useEffect } from "react";

// Define a generic type for the state
type LocalStorageState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorageState<T>(
  initialState: T,
  key: string
): LocalStorageState<T> {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export { useLocalStorageState };
