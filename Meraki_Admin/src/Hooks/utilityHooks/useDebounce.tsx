import { useState, useEffect } from "react";
/**
 * @function useDebounce
 * @param {string|number} value - value to be debounced
 * @param {number} milliSeconds - milliseconds to wait before updating value
 * @returns {Array<string|number>} - array of the debounced value
 * @description Custom hook that takes a value and a number of milliseconds and returns an array containing the debounced value.
 */
 
export const useDebounce = (
  value: string | number,
  milliSeconds: number
): [string | number | undefined] => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return [debouncedValue];
};
