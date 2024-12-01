import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    alt: "Аюрведическая клиника - внешний вид"
  },
  {
    url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2",
    alt: "Процедурный кабинет"
  },
  {
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    alt: "Массажный кабинет"
  },
  {
    url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2",
    alt: "Зона отдыха"
  }
];

export const ImageSlider = () => {
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};