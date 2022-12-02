import cs from "@/utils/cs";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"button">;

const Button: FC<Props> = ({ className, children, ...rest }) => (
  <button
    type="button"
    className={cs(
      "mx-auto self-start rounded-md bg-red-500 px-4 py-2 font-medium text-white shadow-md duration-200 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 active:transform sm:mx-0",
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
