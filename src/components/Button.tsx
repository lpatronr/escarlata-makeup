import cn from "@/utils/cn";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"button">;

const Button: FC<Props> = ({ className, children }) => (
  <button
    type="button"
    className={cn(
      "mx-auto self-start rounded-md bg-red-500 px-4 py-2 font-medium text-white shadow-md duration-200 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 active:transform sm:mx-0",
      className
    )}
  >
    {children}
  </button>
);

export default Button;
