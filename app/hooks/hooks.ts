import { useEffect, useState } from "react";

export const useIsSsr = () => {
  // we always start off in "SSR mode", to ensure our initial browser render
  // matches the SSR render
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    // `useEffect` never runs on the server, so we must be on the client if
    // we hit this block
    setIsSsr(false);
  }, []);

  return isSsr;
};

export const useQueryParams = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);

  return Object.fromEntries(searchParams.entries());
};

export const useScrollToById = (offset: number = 70) => {
  return (id: string) => {
    if (!(typeof window === "undefined")) {
      const targetElement = document?.getElementById(`${id}`);

      if (!targetElement) {
        return;
      }

      // var page = document.querySelector('#page');
      // var scrollable = document.querySelector('#scrollable');
      // var scrolled = document.querySelector('#scrolled');
      // page.scrollTop = scrollable.offsetTop-page.offsetTop;
      // scrollable.scrollTop = scrolled.offsetTop-scrollable.offsetTop;

      const container = document?.getElementById("help");
      // const containerPosition = container?.getBoundingClientRect().top ?? 0;
      // const elementPosition = targetElement.getBoundingClientRect().top;
      // const offsetPosition =
      //   elementPosition + window.scrollY + containerPosition - offset;

      const targetPosition = targetElement.offsetTop - offset;
      const scroll = () => {
        // if (container) {
        //   container.scrollTop = targetPosition;
        // }

        container?.scrollTo({
          top: targetPosition,
          // behavior: "smooth",
        });
      };

      requestAnimationFrame(scroll);
    }
  };
};
