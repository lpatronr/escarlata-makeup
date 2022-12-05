import Image from "next/image";
import { type FC } from "react";
import HeroImage from "@/assets/images/hero.png";
import { Button } from "@/components/buttons";
import { type HeroQuery } from "@/generated/cms/types";

type Props = {
  heroData: HeroQuery["heroes"][number] | undefined;
  handleScrollToFeatured: () => void;
};

const Hero: FC<Props> = ({ heroData, handleScrollToFeatured }) => (
  <div className="flex w-full items-center justify-center gap-24 bg-indigo-200 py-14 px-10 shadow-md sm:px-40">
    <div className="flex flex-col gap-4">
      <div className="flex max-w-sm flex-col gap-4 text-center sm:max-w-md sm:text-left md:max-w-lg">
        <h1 className="text-2xl font-medium tracking-wide lg:text-3xl xl:text-5xl">
          {heroData?.title}
        </h1>
        <p className="text-md xl:text-lg">{heroData?.description}</p>
      </div>

      <Button
        onClick={() => {
          handleScrollToFeatured();
        }}
        aria-label="Desplazarse a la sección de productos destacados"
      >
        {heroData?.buttonText}
      </Button>
    </div>

    <Image
      src={HeroImage}
      alt="Hero image"
      className="pointer-events-none hidden rounded-md lg:block lg:w-96 xl:w-[30rem]"
    />
  </div>
);

export default Hero;
