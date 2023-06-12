// This is the hook for copying to clipboard

import { useState, useCallback } from "react";

type Clipboard = {
  copy: (text: string) => void;
  isCopied: boolean;
};
/**
 *
 * @returns {object{copy , isCopied}} copy is a function which accepts 1 arg and isCopied is the status
 */
const useClipboard = (): Clipboard => {
  const [isCopied, setIsCopied] = useState(false);

  // copy text to clipboard
  /**
   * Creates a function that will copy text to the user's clipboard.
   * @param text The text to copy to the clipboard.
   */
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, []);

  return { copy, isCopied };
};

export default useClipboard;
