import { useQuery } from "@apollo/client";
import { BuildingStorefrontIcon, CheckIcon, TruckIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import { ProductFromIdDocument } from "@/generated/shopify/types";
import { Header } from "@/layouts";
import RecommendedProduct from "@/pages/product/[id]/_shared/components/ProductRecommendationCard";
import {
  ProductImagesSkeleton,
  ProductInfoSkeleton,
} from "@/pages/product/[id]/_shared/components/Skeletons";
import cs from "@/utils/cs";
import formatPriceAsCOP from "@/utils/formatPriceAsCOP";

const ProductPage: NextPage = () => {
  const { id } = useRouter().query;
  const [selectedImage, setSelectedImage] = useState<{
    src: string | undefined;
    alt: string | undefined | null;
  }>({ src: undefined, alt: undefined });
  const { data, loading, refetch } = useQuery(ProductFromIdDocument, {
    variables: {
      id: `gid://shopify/Product/${id}`,
    },
    skip: id === undefined,
    onError(error) {
      if (error.networkError) {
        void refetch();
      }
    },
    onCompleted(data) {
      setSelectedImage({
        src: data.product?.images?.nodes?.[0]?.url,
        alt: data.product?.images?.nodes?.[0]?.altText,
      });
    },
  });
  const productRecommendations = data?.productRecommendations;
  const product = data?.product;
  const allImages = product?.images?.nodes;

  const productPrice = product?.priceRange?.minVariantPrice?.amount;
  const formattedPrice = formatPriceAsCOP(productPrice);

  return (
    <>
      <Head>
        <title>{product?.title ?? "Viendo Producto - Escarlata Makeup"}</title>
        <meta name="description" content={product?.description} />
      </Head>

      <Header />

      <main className="mx-auto mt-20 flex max-w-2xl flex-col gap-4 rounded-lg border border-gray-100 px-4 py-16 lg:max-w-7xl lg:flex-row">
        <div className="flex justify-center gap-3 lg:justify-start">
          {loading || allImages === undefined || selectedImage.src === undefined ? (
            <ProductImagesSkeleton />
          ) : (
            <>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt ?? "Imagen del producto"}
                width={500}
                height={500}
                quality={100}
                priority
                className="h-[32rem] w-[30rem] rounded-lg object-cover object-center"
              />

              <div className="hidden max-h-[32rem] grid-rows-4 gap-2 sm:grid">
                {allImages.map((image) => (
                  <Image
                    key={image?.id}
                    src={image?.url}
                    alt={image?.altText ?? "Imagen del producto"}
                    width={100}
                    height={100}
                    className={cs(
                      "h-full h-[8rem] w-auto w-[6rem] cursor-pointer rounded-lg object-cover object-center",
                      selectedImage.src === image?.url && "ring-2 ring-red-500 ring-opacity-75"
                    )}
                    onClick={() => {
                      setSelectedImage({
                        src: image?.url,
                        alt: image?.altText,
                      });
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2">
          {loading || product === undefined || product === null ? (
            <ProductInfoSkeleton />
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-2xl font-medium">{formattedPrice}</p>
                <p className="mt-2 leading-7">{product.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="my-2 flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-neutral-600">En stock y listo para enviar</p>
                </div>

                <div className="flex items-center gap-6 sm:gap-8">
                  <AddToCartButton
                    merchandiseId={product.variants.edges[0]?.node.id as string}
                    className="mt-2 self-start rounded-sm bg-red-500 px-6 px-4 py-2 font-medium text-white shadow-md duration-200 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 active:transform xs:px-12 sm:mx-0 sm:px-16"
                  >
                    Agregar al bolso
                  </AddToCartButton>

                  <FavoriteButton productId={product.id} />
                </div>

                <div className="mt-4 flex flex-col justify-center gap-4 border-t border-gray-100 pt-4 sm:flex-row">
                  <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-gray-200 bg-gray-100 py-4 px-5">
                    <TruckIcon className="h-5 w-5 text-gray-400" />
                    <p className="text-sm font-bold tracking-wide text-gray-800">Envío Nacional</p>
                    <p className="text-sm text-gray-600">Recibe tu pedido pronto</p>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-gray-200 bg-gray-100 py-4 px-5">
                    <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                    <p className="text-sm font-bold tracking-wide text-gray-800">
                      Recoge en tienda
                    </p>
                    <p className="text-sm text-gray-600">Acordamos hora y día</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <section className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Los clientes también han comprado
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productRecommendations?.map((product) => (
              <RecommendedProduct
                key={product.id}
                title={product.title}
                tags={product.tags}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                image={product.images?.nodes[0]}
                id={product.id}
                amount={product.priceRange.minVariantPrice.amount}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
