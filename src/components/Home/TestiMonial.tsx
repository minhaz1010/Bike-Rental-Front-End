import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";
import Section from "../Shared/DescriptionSection";


const testimonials = [
  {
    statement: "The bike rental service was incredibly convenient. I loved how easy it was to pick up and drop off the bikes.",
    customerName: "Emily Johnson"
  },
  {
    statement: "Great selection of bikes and excellent customer service. Made my city tour a breeze!",
    customerName: "Michael Chen"
  },
  {
    statement: "Affordable prices and well-maintained bikes. I'll definitely use this service again on my next visit.",
    customerName: "Sarah Thompson"
  }
];

const TestiMonial = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnMouseEnter: false, stopOnFocusIn: false, stopOnInteraction: false, stopOnLastSnap: false })
  )
  return (

    <div  >
      <Section title="Testimonials"></Section>

      <Carousel
        plugins={[plugin.current]}
        className="w-full container mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-1 new-amsterdam-regular">
                <Card className="">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[200px]">
                    <blockquote className="text-2xl  md:text-4xl  mb-4 text-yellow-700 ">"{testimonial.statement}"</blockquote>
                    <p className=" text-3xl text-green-500">- {testimonial.customerName}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div >
  );
};

export default TestiMonial;