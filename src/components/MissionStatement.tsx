import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DescriptionSection from "./Shared/DescriptionSection";

const MissionStatement = () => {
  const points = [
    {
      title: "Our Mission",
      description: ` At BikeX, our mission is to empower your journey with reliable and affordable bike rentals. 🌍 We are committed to sustainability, adventure, and creating memorable experiences for every rider. 🌟`,
      icon: "🚴‍♂️",
    },
    {
      title: "Our Vision",
      description: `Our vision is to become the leading bike rental service, making it easy for everyone to explore their surroundings sustainably. 🚴‍♀️ We aim to inspire a sense of adventure and freedom in every rider, one bike at a time. 🌿`,
      icon: "🌟",
    },
  ];

  return (
    <>
      <DescriptionSection title="Mission And Vision" />
      <section className="py-16 new-amsterdam-regular ">
        <div className="container mx-auto flex flex-col   items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {points.map((point, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl hover:shadow-slate-600 transition-shadow duration-300 overflow-hidden"
              >
                <CardHeader className="bg-sky-500 text-[#000] p-4">
                  <CardTitle className="text-3xl md:text-5xl font-extralight flex items-center">
                    <span className="text-4xl mr-4 ">{point.icon}</span>
                    {point.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-2xl lg:text-4xl">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MissionStatement;
