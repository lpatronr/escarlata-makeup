import { useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { ProductsForFavoritesDocument } from "@/generated/shopify/types";
import Favorite from "@/layouts/Header/Favorites/Favorite";
import { userFavoritesState } from "@/store";
import type { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Favorites: FC<Props> = ({ open, setOpen }) => {
  const productsQuery = useQuery(ProductsForFavoritesDocument);
  const [userFavorites] = useRecoilState(userFavoritesState);

  const products =
    productsQuery.data?.products.nodes.filter((product) =>
      userFavorites.some((favorite) => favorite.productId === product.id)
    ) ?? [];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto flex w-screen max-w-md flex-col">
                  <div className="h-full flex-1 overflow-y-scroll bg-white py-6 px-4 shadow-xl sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Favoritos
                      </Dialog.Title>

                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <span className="sr-only">Cerrar favoritos</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <ul role="list" className="-my-6 mt-3 flow-root divide-y divide-gray-200">
                      {products.map((product) => (
                        <Favorite key={product.id} product={product} />
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Favorites;
