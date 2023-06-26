import React, { useCallback, useState } from "react";

export const useOnScreen = ({
  root = null,
  rootMargin = "0px",
  threshold = 0
} = {}) => {

  const [observer, setOserver] = useState<any>();
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  const measureRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );
        observer.observe(node);
        setOserver(observer);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer };
};
