import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon,
  LockClosedIcon,
  UserCircleIcon as OutlineUserCircleIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC, Fragment, useState } from "react";
import CartButton from "@/layouts/Header/CartButton";
import Favorites from "@/layouts/Header/Favorites";
import cs from "@/utils/cs";

const Header: FC = () => {
  const [openFavorites, setOpenFavorites] = useState(false);
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  const userImage = session.data?.user?.image;

  return (
    <nav className="sticky top-0 z-10 flex select-none items-center justify-between bg-white px-10 py-2 shadow-md sm:py-4 sm:px-10 md:px-20 lg:px-44 xl:px-52 2xl:px-72">
      <Favorites open={openFavorites} setOpen={setOpenFavorites} />

      <Link href="/" className="font-cookie text-2xl font-medium 3xl:text-3xl 4xl:text-4xl">
        <span className="hidden sm:inline">Escarlata Makeup</span>
        <span className="sm:hidden">Escarlata M.</span>
      </Link>

      <div className="flex items-baseline gap-2">
        {isAuthenticated ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                {userImage !== null && userImage !== undefined ? (
                  <Image
                    src={userImage}
                    alt="User image"
                    className="h-6 w-6 cursor-pointer rounded-full"
                    width={24}
                    height={24}
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6 cursor-pointer" />
                )}
                <ChevronDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="divide-y divide-gray-100 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={cs(
                          active && "bg-gray-100",
                          "flex w-full items-center gap-1 self-stretch px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setOpenFavorites(!openFavorites);
                        }}
                      >
                        <HeartIcon className="h-4 w-4 text-black" aria-hidden="true" />
                        Favoritos
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={cs(
                          active && "bg-gray-100",
                          "flex w-full items-center gap-1 self-stretch px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          void signOut();
                        }}
                      >
                        <LockClosedIcon className="h-4 w-4 text-black" aria-hidden="true" />
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
              void signIn("google", undefined, {
                prompt: "login",
              });
            }}
          >
            <OutlineUserCircleIcon className="h-6 w-6 flex-shrink-0 text-gray-600 hover:text-gray-800" />
          </button>
        )}

        <CartButton />
      </div>
    </nav>
  );
};

export default Header;
