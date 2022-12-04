import { type FC } from "react";

const SkeletonProduct: FC = () => (
  <div className="flex animate-pulse flex-col justify-between rounded-md p-3 shadow-md">
    <div>
      <div className="h-62 w-full rounded-md bg-gray-200 object-cover xs:h-96 sm:h-64 md:h-72 lg:h-80 xl:h-96" />

      <div className="mt-2 flex h-24 flex-col gap-1">
        <div className="h-5 w-3/4 bg-gray-200 text-lg font-medium capitalize" />
        <div className="h-5 w-1/4 self-start rounded-md bg-gray-200 px-1 py-0.5 text-xs font-medium" />
        <div className="h-5 w-3/4 overflow-y-hidden text-sm text-gray-500" />
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <div className="h-5 w-1/4 text-lg font-medium" />

      <div className=" flex items-center gap-1">
        <div className="mr-1 flex h-5 w-1/4 items-center gap-1 rounded-md bg-red-200 p-2 text-sm shadow-sm duration-200 ease-in-out hover:bg-gray-300 active:scale-95 active:transform" />

        <div className="group h-5 w-1/4 active:scale-95 active:transform" />
      </div>
    </div>
  </div>
);

export default SkeletonProduct;
