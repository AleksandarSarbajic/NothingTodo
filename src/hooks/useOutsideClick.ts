import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function useClickHandler(e: Event) {
      if (ref.current && !ref?.current?.contains(e.target as Node)) {
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
