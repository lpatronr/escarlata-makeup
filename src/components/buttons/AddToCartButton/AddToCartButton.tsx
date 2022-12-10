import { type ComponentPropsWithoutRef, type FC } from "react";
import cs from "@/utils/cs";
import { trpc } from "@/utils/trpc";

type Props = {
  merchandiseId: string;
} & ComponentPropsWithoutRef<"button">;

const AddToCartButton: FC<Props> = ({ children, merchandiseId, className, ...props }) => {
  const createCart = trpc.cart.createCart.useMutation();

  return (
    <button
      type="button"
      className={cs("disabled:opacity-50", className)}
      disabled={createCart.isLoading}
      onClick={() => {
        createCart.mutate(
          {
            merchandiseId,
          },
          {
            onSuccess(data) {
              console.log(data);
            },
            onError(error) {
              console.log(error);
            },
          }
        );
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default AddToCartButton;
