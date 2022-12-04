import { useQuery } from "@apollo/client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { type FC } from "react";
import { FeaturedProductsDocument } from "@/generated/shopify/types";
import FeaturedProduct from "@/pages/_shared/components/Featured/FeaturedProduct";
import type { RefObject } from "react";

type Props = {
  featuredRef: RefObject<HTMLDivElement>;
};

const Featured: FC<Props> = ({ featuredRef }) => {
  const { data, loading, refetch } = useQuery(FeaturedProductsDocument, {
    onError(error) {
      if (error.networkError) {
        void refetch();
      }
    },
  });
  const featuredProducts = data?.products.nodes ?? [];

  return (
    <div className="mt-12 px-10 sm:px-10 md:px-20 lg:px-32 xl:px-40 2xl:px-48" ref={featuredRef}>
      <h1 className="mb-6 text-2xl font-medium capitalize">Nuevo</h1>

      <Splide
        options={{
          arrows: true,
          perPage: 4,
          drag: "free",
          gap: "2rem",
          pagination: false,
          breakpoints: {
            425: {
              perPage: 1,
            },
            1024: {
              perPage: 2,
            },
            1440: {
              perPage: 3,
            },
            1920: {
              perPage: 4,
            },
            2560: {
              perPage: 6,
            },
          },
        }}
      >
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <SplideSlide
                // eslint-disable-next-line react/no-array-index-key
                key={`featured-product-skeleton-${index}`}
                className="flex flex-col p-2 tracking-tighter"
              >
                <div className="h-60 w-full animate-pulse rounded-md bg-gray-200 object-cover shadow-md xl:h-80" />
                <div className="mt-2 h-4 w-1/2 animate-pulse bg-gray-200 text-lg font-medium capitalize" />
                <div className="h-4 w-1/3 animate-pulse bg-gray-200 text-sm text-gray-500" />
                <div className="mt-2 block h-4 w-1/2 animate-pulse self-center bg-gray-200 px-8 py-4 text-sm" />
              </SplideSlide>
            ))}
          </>
        ) : (
          featuredProducts.map((product) => <FeaturedProduct product={product} key={product.id} />)
        )}
      </Splide>
    </div>
  );
};

export default Featured;
