import { useEffect } from "react";

/** Sets document.title per route. Cheap, and it matters for tabs,
 *  bookmarks, and anything that scrapes the page. */
export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
