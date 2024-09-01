import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DescriptionSection from "../Shared/DescriptionSection";

const WhyChooseUs = () => {
  const sellingPoints = [
    {
      title: "Best Prices",
      description: "We offer competitive rates without compromising on quality. Our transparent pricing ensures you get the best value for your money.",
      icon: "💰",
    },
    {
      title: "Wide Selection",
      description: "From city cruisers to mountain bikes, we have a diverse range of well-maintained bikes to suit every rider's needs and preferences.",
      icon: "🚲",
    },
    {
      title: "Excellent  Service",
      description: "Our friendly and knowledgeable staff are always ready to assist you, ensuring a smooth and enjoyable rental experience.",
      icon: "🌟",
    },
  ];

  return (
    <section className="py-16 ">
      <DescriptionSection title="why choose us?" />
      <div className="container mx-auto px-6 new-amsterdam-regular">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sellingPoints.map((point, index) => (
            <Card key={index} className=" hover:shadow-2xl hover:shadow-slate-600 transition-shadow duration-300 overflow-hidden">
              <CardHeader className="bg-teal-900 text-white p-4 ">
                <CardTitle className="text-3xl md:text-5xl font-extralight  flex items-center">
                  <span className="text-4xl mr-4">{point.icon}</span>
                  {point.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600  text-3xl">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;