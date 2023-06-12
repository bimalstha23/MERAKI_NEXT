import { useCallback, useState } from "react";
/**
 * useToggle is a React Hook that returns a boolean value and a toggle function that allows you to toggle the value of the boolean.
 * @param initialValue - Set the initial value of the boolean. Default is false.
 * @returns [boolean, (value?: boolean) => void] - Returns a tuple where the first value is the boolean value and the second value is the toggle function that allows you to toggle the value of the boolean.
 */
export const useToggle = (
  initialValue = false
): [boolean, (value?: boolean) => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const toggle = useCallback(
    (value?: boolean) => setIsOpen(value ?? !isOpen),
    [isOpen]
  );

  return [isOpen, toggle];
};
