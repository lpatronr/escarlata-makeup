import cs from "@/utils/cs";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  color?: string;
} & ComponentPropsWithoutRef<"button">;

const Button: FC<Props> = ({ className, color = undefined, children, ...rest }) => (
  <button
    type="button"
    className={cs(
      "mx-auto self-start rounded-sm px-4 py-2 font-medium text-white shadow-md duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 active:transform sm:mx-0",
      color === undefined ? "bg-red-500 hover:bg-red-600" : color,
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
