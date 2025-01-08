import { useEffect } from "react";

function UseEndOfscroll(
  funcToExecute: Function,
  hasMoreData: boolean
) {
  function verifyScrollReachEndOfPage(e: Event) {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    console.log(scrollHeight, scrollTop, clientHeight);
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight && hasMoreData) {
      funcToExecute();  // Execute function when the end of scroll is reached
    }
  }

  useEffect(() => {
    // Add scroll event listener to the document body
    document.addEventListener("scroll", verifyScrollReachEndOfPage);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("scroll", verifyScrollReachEndOfPage);
    };
  }, [funcToExecute, hasMoreData]);  // Dependencies for re-running the effect

  return {};
}

export default UseEndOfscroll;
