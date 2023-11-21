import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function useClickHandler(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", useClickHandler, listenCapturing);

    return () => {
      document.removeEventListener("click", useClickHandler, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
