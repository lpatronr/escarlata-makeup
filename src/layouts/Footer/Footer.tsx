import Link from "next/link";
import { type FC } from "react";
import FacebookIcon from "@/layouts/Footer/FacebookIcon";
import InstagramIcon from "@/layouts/Footer/InstagramIcon";
import WhatsAppIcon from "@/layouts/Footer/WhatsAppIcon";

const Footer: FC = () => (
  <footer className="flex w-full flex-col items-center justify-center bg-neutral-800 py-6 text-white">
    <Link href="/src/pages" className="font-cookie text-2xl font-medium 3xl:text-3xl 4xl:text-4xl">
      <span className="hidden sm:inline">Escarlata Makeup</span>
      <span className="sm:hidden">Escarlata M.</span>
    </Link>

    <p className="text-sm">© 2022 - Todos los derechos reservados</p>

    <div className="mt-1 flex items-center gap-1">
      <WhatsAppIcon />
      <InstagramIcon />
      <FacebookIcon />
    </div>
  </footer>
);

export default Footer;
