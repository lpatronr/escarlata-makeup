import { useQuery } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { type FC, Fragment, useState } from "react";
import { ProductsDocument, ProductSortKeys } from "@/generated/shopify/types";
import MobileFilters from "@/pages/_shared/components/AllProducts/MobileFilters";
import Product from "@/pages/_shared/components/AllProducts/Product";
import SkeletonProduct from "@/pages/_shared/components/AllProducts/SkeletonProduct";
import cs from "@/utils/cs";

const _sortOptions = [
  { name: "Nuevo", sort: ProductSortKeys.CreatedAt, reverse: false, current: true },
  { name: "Precio: Menor a Mayor", sort: ProductSortKeys.Price, reverse: false, current: false },
  { name: "Precio: Mayor a Menor", sort: ProductSortKeys.Price, reverse: true, current: false },
];

const AllProducts: FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [sortOptions, setSortOptions] = useState(_sortOptions);
  const [isRefetching, setIsRefetching] = useState(false);
  const numberOfProducts = 12;
  const { data, loading, refetch } = useQuery(ProductsDocument, {
    variables: {
      query: "",
      first: numberOfProducts,
      after: null,
      before: null,
      sortKey: sortOptions.find((option) => option.current)?.sort ?? ProductSortKeys.CreatedAt,
      reverse: sortOptions.find((option) => option.current)?.reverse ?? false,
    },
    fetchPolicy: "cache-and-network",
    onError(error) {
      if (error.networkError) {
        void refetch();
      }
    },
  });
  const products = data?.products.nodes ?? [];
  const hasNextPage = data?.products.pageInfo.hasNextPage ?? false;
  const hasPreviousPage = data?.products.pageInfo.hasPreviousPage ?? false;
  const endCursor = data?.products.pageInfo.endCursor ?? null;
  const startCursor = data?.products.pageInfo.startCursor ?? null;

  function handleNextPage(): void {
    if (hasNextPage && !isRefetching) {
      setIsRefetching(true);

      setTimeout(() => {
        setIsRefetching(false);
      }, 1000);

      void refetch({
        query,
        before: null,
        first: numberOfProducts,
        last: null,
        after: endCursor,
        sortKey: sortOptions.find((option) => option.current)?.sort ?? ProductSortKeys.CreatedAt,
        reverse: sortOptions.find((option) => option.current)?.reverse ?? false,
      });
    }
  }

  function handlePreviousPage(): void {
    if (hasPreviousPage && !isRefetching) {
      setIsRefetching(true);

      setTimeout(() => {
        setIsRefetching(false);
      }, 1000);

      void refetch({
        query,
        first: null,
        last: numberOfProducts,
        before: startCursor,
        after: null,
        sortKey: sortOptions.find((option) => option.current)?.sort ?? ProductSortKeys.CreatedAt,
        reverse: sortOptions.find((option) => option.current)?.reverse ?? false,
      });
    }
  }

  return (
    <main className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-12">
      <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
        <div className="flex flex-col items-center items-baseline gap-8 lg:flex-row">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:text-4xl">Productos</h1>

          <label
            htmlFor="search"
            className="flex cursor-text items-center gap-1 rounded-md bg-gray-100 px-2 shadow-md"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />

            <input
              id="search"
              type="text"
              placeholder="Buscar"
              className="w-24 bg-gray-100 py-1 px-2 outline-none xs:w-28 sm:w-36 md:w-44 lg:w-52"
              value={query}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setQuery(value.trim());

                if (value === "") {
                  void refetch({
                    query: "",
                  });
                  return;
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void refetch({ query });
                }
              }}
            />
          </label>
        </div>

        <MobileFilters open={mobileFiltersOpen} setOpen={setMobileFiltersOpen} />

        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Ordenar
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="divide-y divide-gray-100 py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <button
                          type="button"
                          className={cs(
                            option.current ? "font-medium text-gray-900" : "text-gray-500",
                            active && "bg-gray-100",
                            "flex w-full items-center gap-1 self-stretch px-4 py-2 text-left text-sm"
                          )}
                          onClick={() => {
                            setSortOptions(
                              sortOptions.map((o) => ({ ...o, current: o.name === option.name }))
                            );
                          }}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={() => {
              setMobileFiltersOpen(true);
            }}
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <h2 id="products-heading" className="sr-only">
          Productos
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            <h3 className="sr-only">Categorías</h3>
            <ul
              role="list"
              className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
            >
              {/*{subCategories.map((category) => (*/}
              {/*  <li key={category.name}>*/}
              {/*    <a href={category.href}>{category.name}</a>*/}
              {/*  </li>*/}
              {/*))}*/}
            </ul>

            {/*{filters.map((section) => (*/}
            {/*  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">*/}
            {/*    {({ open }) => (*/}
            {/*      <>*/}
            {/*        <h3 className="-my-3 flow-root">*/}
            {/*          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">*/}
            {/*            <span className="font-medium text-gray-900">{section.name}</span>*/}
            {/*            <span className="ml-6 flex items-center">*/}
            {/*              {open ? (*/}
            {/*                <MinusIcon className="h-5 w-5" aria-hidden="true" />*/}
            {/*              ) : (*/}
            {/*                <PlusIcon className="h-5 w-5" aria-hidden="true" />*/}
            {/*              )}*/}
            {/*            </span>*/}
            {/*          </Disclosure.Button>*/}
            {/*        </h3>*/}

            {/*        <Disclosure.Panel className="pt-6">*/}
            {/*          <div className="space-y-4">*/}
            {/*            {section.options.map((option, optionIdx) => (*/}
            {/*              <div key={option.value} className="flex items-center">*/}
            {/*                <input*/}
            {/*                  id={`filter-${section.id}-${optionIdx}`}*/}
            {/*                  name={`${section.id}[]`}*/}
            {/*                  defaultValue={option.value}*/}
            {/*                  type="checkbox"*/}
            {/*                  defaultChecked={option.checked}*/}
            {/*                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"*/}
            {/*                />*/}
            {/*                <label*/}
            {/*                  htmlFor={`filter-${section.id}-${optionIdx}`}*/}
            {/*                  className="ml-3 text-sm text-gray-600"*/}
            {/*                >*/}
            {/*                  {option.label}*/}
            {/*                </label>*/}
            {/*              </div>*/}
            {/*            ))}*/}
            {/*          </div>*/}
            {/*        </Disclosure.Panel>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*  </Disclosure>*/}
            {/*))}*/}
          </form>

          <div className="lg:col-span-3">
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {loading ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SkeletonProduct key={`product-skeleton-${index}`} />
                  ))}
                </>
              ) : (
                products.map((product) => <Product product={product} key={product.id} />)
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 border-t border-gray-200">
          <button
            type="button"
            disabled={!hasPreviousPage}
            className="mt-8 flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => {
              handlePreviousPage();
            }}
          >
            <ArrowLongLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={!hasNextPage}
            onClick={() => {
              handleNextPage();
            }}
          >
            <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default AllProducts;
