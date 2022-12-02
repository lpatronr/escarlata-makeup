import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon, StarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type FC, Fragment } from "react";
import CartButton from "@/layouts/Header/CartButton";
import cs from "@/utils/cs";

const Header: FC = () => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const userImage = session.data?.user?.image;

  return (
    <nav className="sticky top-0 z-10 flex select-none items-center justify-between bg-white px-10 py-2 shadow-md sm:py-4 sm:px-10 md:px-20 lg:px-44 xl:px-52 2xl:px-72">
      <Link href="/" className="font-cookie text-2xl font-medium 3xl:text-3xl 4xl:text-4xl">
        <span className="hidden sm:inline">Escarlata Makeup</span>
        <span className="sm:hidden">Escarlata M.</span>
      </Link>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex w-full items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-2 text-sm font-medium text-white hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {userImage !== null ? (
                <img
                  src={userImage}
                  alt="User image"
                  className="h-6 w-6 cursor-pointer rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-6 w-6 cursor-pointer" />
              )}
              <ChevronDownIcon
                className="h-5 w-5 text-black hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="flex w-44 flex-col divide-y divide-gray-100 p-2">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/account"
                        className={cs(
                          "flex items-center gap-1 rounded-md px-2 py-1",
                          active && "bg-gray-100"
                        )}
                      >
                        <StarIcon className="h-4 w-4 text-black" />
                        Favoritos
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={cs(
                          "flex items-center gap-1 rounded-md px-2 py-1",
                          active && "bg-gray-100"
                        )}
                        onClick={() => {
                          void signOut();
                        }}
                      >
                        <LockClosedIcon className="h-4 w-4 text-black" />
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <button
            type="button"
            aria-label={isAuthenticated ? "Opciones de Usuario" : "Iniciar sesión"}
            onClick={() => {
              void signIn("google");
            }}
          >
            <UserCircleIcon className="h-6 w-6 flex-shrink-0 text-gray-600 hover:text-gray-800" />
          </button>
        )}

        <CartButton />
      </div>
    </nav>
  );
};

export default Header;
