import { HeartIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon, CheckIcon, TruckIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/buttons";
import type { FC } from "react";

const ProductInfoSkeleton: FC = () => (
  <>
    <div className="flex flex-col gap-2">
      <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200" />
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
    </div>

    <div className="flex flex-col gap-2">
      <div className="my-2 flex items-center gap-2">
        <CheckIcon className="h-5 w-5 text-green-500" />
        <p className="text-sm text-neutral-600">En stock y listo para enviar</p>
      </div>

      <div className="flex items-center gap-8">
        <Button className="mt-2 px-16">Agregar al bolso</Button>

        <button type="button">
          <HeartIcon
            className="h-6 w-6 text-gray-400 transition-colors duration-200 ease-in-out hover:fill-red-500 active:scale-95 active:transform active:fill-red-600"
            aria-label="Agregar a favoritos"
          />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 border-t border-gray-100 pt-4">
        <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-200 bg-gray-100 py-4 px-5">
          <TruckIcon className="h-5 w-5 text-gray-400" />
          <p className="text-sm font-bold tracking-wide text-gray-800">Envío Nacional</p>
          <p className="text-sm text-gray-600">Recibe tu pedido pronto</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-gray-200 bg-gray-100 py-4 px-5">
          <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
          <p className="text-sm font-bold tracking-wide text-gray-800">Recoge en tienda</p>
          <p className="text-sm text-gray-600">Acordamos hora y día</p>
        </div>
      </div>
    </div>
  </>
);

export default ProductInfoSkeleton;
