import { type FC, useState } from "react";
import { CartIcon } from "@/components/icons";
import Cart from "@/layouts/Header/Cart";

const CartButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flow-root">
      <button
        type="button"
        className="group relative -m-2 flex items-center p-2"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <CartIcon className="h-6 w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-800" />
        <div className="absolute inset-0 -mr-6 object-right-top">
          <span className="inline-flex items-center rounded-full border-2 border-white bg-red-500 px-1.5 py-[0.0625rem] text-xs font-semibold leading-4 text-white">
            2
          </span>
        </div>
        <span className="sr-only">artículos en el carrito de compras, ver carrito</span>
      </button>

      <Cart open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default CartButton;
