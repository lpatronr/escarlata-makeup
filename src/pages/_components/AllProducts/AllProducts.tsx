import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Product from "@/pages/_components/AllProducts/Product";
import { allCategories, mockProducts } from "@/pages/_components/AllProducts/mock";
import cn from "@/utils/cn";
import type { FC } from "react";

const AllProducts: FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productQuery, setProductQuery] = useState<string>("");

  const filteredProducts = mockProducts
    .filter((product) => {
      if (selectedCategories.length === 0) {
        return true;
      }

      return selectedCategories.includes(product.category);
    })
    .filter((product) => {
      if (productQuery === "") {
        return true;
      }

      return product.title.toLowerCase().includes(productQuery.toLowerCase());
    });

  return (
    <div className="flex flex-col gap-10 px-10 sm:px-8 md:px-12 lg:px-20 xl:flex-row 2xl:px-48">
      <div className="mt-20 flex flex-col">
        <h1 className="mb-6 text-2xl font-medium capitalize">Productos</h1>

        <h2 className="text-lg font-medium">Categorías</h2>
        <div className="mt-2 grid w-72 grid-cols-2 gap-3">
          {allCategories.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => {
                if (selectedCategories.includes(id)) {
                  setSelectedCategories((prev) => prev.filter((category) => category !== id));
                } else {
                  setSelectedCategories((prev) => [...prev, id]);
                }
              }}
              type="button"
              className={cn(
                "flex h-6 w-36 items-center justify-center rounded-md py-4 font-medium capitalize shadow-sm duration-200 ease-in-out active:scale-95 active:transform",
                selectedCategories.includes(id) ? "bg-indigo-400 text-white" : "bg-gray-200"
              )}
            >
              {name}
            </button>
          ))}
        </div>

        <h2 className="mt-3 text-lg font-medium">Filtros</h2>
      </div>

      <div className="mt-20 flex flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="self-start"
        >
          <label
            htmlFor="search"
            className="flex items-center gap-1 rounded-md bg-gray-100 px-2 shadow-md"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />

            <input
              id="search"
              type="text"
              placeholder="Buscar"
              className="bg-gray-100 py-1 px-2 outline-none"
              onChange={(e) => {
                setTimeout(() => {
                  setProductQuery(e.target.value);
                }, 200);
              }}
            />
          </label>
        </form>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-medium">No hay productos</h1>
            </div>
          ) : (
            filteredProducts.map(({ id, title, description, price, image, category }) => (
              <Product
                key={id}
                title={title}
                image={image}
                category={category}
                description={description}
                price={price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
