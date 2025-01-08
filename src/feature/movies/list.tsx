import React, { ReactNode, useRef } from "react";
import UseEndOfscroll from "../../utils/hooks/useEndOfscroll";

interface ListProps<T> {
  list: T[]; // The list is now of generic type T
  renderElement: (item: T) => ReactNode; // renderElement takes an item of type T
  fetchNextPage: Function;
  hasNextPage: boolean;
}

export default function List<T>({
  list,
  renderElement,
  hasNextPage,
  fetchNextPage,
}: ListProps<T>) {
 const ref = useRef(null);
 UseEndOfscroll(fetchNextPage, hasNextPage);

  return (
    <div id="mainscroll" ref={ref} className="w-9/12 h-full flex justify-center items-center overflow-scroll" >
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-14 gap-y-12 py-6 w-[80%]">
        {list?.map((item, index) => (
          <div key={index}>
            {renderElement(item)}{" "}
            {/* Pass each item to the renderElement function */}
          </div>
        ))}
      </div>
    </div>
  );
}
