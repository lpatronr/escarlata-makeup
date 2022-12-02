import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { type FC } from "react";
import Button from "@/components/Button";
import type { RefObject } from "react";

const mock = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 100,
    image:
      "https://www.maybelline.co.in/~/media/mny/en_in/lip/modules/featured%20product%20collage/feb%202020/slm_2.jpg?h=680&w=680&la=en-IN&hash=8380A93D91F025A0FA9990952E67EED63DFF6267",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 50,
    image:
      "https://media.istockphoto.com/photos/beauty-swatches-picture-id1135739038?b=1&k=20&m=1135739038&s=612x612&w=0&h=5O2JGij6y4AJlnOnnjillHkn81g-VNmUDEEjoBB_K70=",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 50,
    image: "https://cdn.shopify.com/s/files/1/0062/7533/4205/products/262_500x.jpg?v=1646945378",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 50,
    image:
      "https://images.squarespace-cdn.com/content/v1/52a822e8e4b08568b8f859c7/1539071235919-XCU5BA651JWACTROE3TH/IMG_3094+shadows.jpg?format=2500w",
  },
];

type Props = {
  featuredRef: RefObject<HTMLDivElement>;
};

const Featured: FC<Props> = ({ featuredRef }) => (
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
      {mock.map((item) => (
        <SplideSlide key={item.id} className="p-2 tracking-tighter">
          <img
            src={item.image}
            alt={item.title}
            className="h-60 w-full rounded-md object-cover shadow-md xl:h-80"
          />
          <p className="mt-2 text-2xl font-medium">${item.price}</p>
          <h1 className="text-lg font-medium capitalize">{item.title}</h1>
          <p className="text-sm text-gray-500">{item.description}</p>

          <Button className="mt-2 px-8 py-0.5">Ver</Button>
        </SplideSlide>
      ))}
    </Splide>
  </div>
);

export default Featured;
