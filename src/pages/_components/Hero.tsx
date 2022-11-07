import Image from "next/image";
import HeroImage from "@/assets/images/hero.png";
import Button from "@/components/Button";
import type { FC } from "react";

const Hero: FC = () => (
  <div className="flex h-96 w-full items-center justify-center gap-24 bg-indigo-200 px-10 shadow-md sm:px-40">
    <div className="flex flex-col gap-4">
      <div className="flex max-w-sm flex-col gap-4 text-center sm:max-w-md sm:text-left md:max-w-lg">
        <h1 className="text-2xl font-medium tracking-wide lg:text-3xl xl:text-5xl">
          Encuentra tu combinación de maquillaje perfecta.
        </h1>
        <p className="text-md xl:text-lg">
          Tanto si buscas una nueva base de maquillaje, un corrector, una sombra de ojos o una barra
          de labios, podemos ayudarte a encontrar el maquillaje perfecto para tu tono de piel, tu
          estilo y tu presupuesto.
        </p>
      </div>

      <Button>Ver productos</Button>
    </div>

    <Image
      src={HeroImage}
      alt="Hero image"
      className="pointer-events-none hidden rounded-md lg:block lg:w-96 xl:w-[30rem]"
    />
  </div>
);

export default Hero;
