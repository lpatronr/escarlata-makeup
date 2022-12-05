import type { FC } from "react";

const ProductImagesSkeleton: FC = () => (
  <>
    <div className="h-[32rem] w-[32rem] animate-pulse rounded-lg bg-gray-200" />
    <div className="grid max-h-[32rem] grid-rows-4 gap-2">
      <div className="h-[8rem] w-[8rem] animate-pulse rounded-lg bg-gray-200" />
      <div className="h-[8rem] w-[8rem] animate-pulse rounded-lg bg-gray-200" />
      <div className="h-[8rem] w-[8rem] animate-pulse rounded-lg bg-gray-200" />
      <div className="h-[8rem] w-[8rem] animate-pulse rounded-lg bg-gray-200" />
    </div>
  </>
);

export default ProductImagesSkeleton;
