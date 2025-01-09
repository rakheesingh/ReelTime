import React, { ReactNode, useRef } from "react";
import UseEndOfscroll from "../../utils/hooks/useEndOfscroll";
import Content from "../../designSystem/text/Content";

interface ListProps<T> {
  list: T[]; // The list is now of generic type T
  renderElement: (item: T) => ReactNode; // renderElement takes an item of type T
  fetchNextPage: Function;
  hasNextPage: boolean;
  status: string;
}

export default function List<T>({
  list,
  renderElement,
  hasNextPage,
  fetchNextPage,
  status,
}: ListProps<T>) {
  const ref = useRef(null);
  UseEndOfscroll(fetchNextPage, hasNextPage);

  if (status === "pending")
    return (
      <Content className="absolute top-[50%] left-[50%] font-bold text-red-900 translate-x-[-50%] translate-y-[-50%]">
        <>Loading...</>
      </Content>
    );

  if (list.length === 0)
    return (
      <Content className="absolute top-[50%] left-[50%] font-bold text-red-900">
        <>No data avialble for display</>
      </Content>
    );

  return (
    <div
      id="mainscroll"
      ref={ref}
      className="w-9/12 h-full flex justify-center items-center overflow-scroll"
    >
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
