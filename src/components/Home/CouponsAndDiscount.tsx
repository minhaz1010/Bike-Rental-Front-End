import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DescriptionSection from "../Shared/DescriptionSection";

const CouponsAndDiscount = () => {
  const promotions = [
    {
      code: "SUMMER10",
      discount: "10% off",
      description: "Get 10% off on all bike rentals for summer adventures!",
      expiry: "Valid until August 31, 2024",
    },
    {
      code: "NEWRIDER",
      discount: "100 BDT off",
      description: "First-time riders get 100 BDT off their first rental.",
      expiry: "No expiration",
    },
    {
      code: "WEEKENDRIDE",
      discount: "5% off",
      description: "Enjoy 5% off on weekend rentals (Fri-Sun).",
      expiry: "Valid every weekend",
    },
  ];

  return (
    <section className="py-16 ">
      <DescriptionSection title="coupons and discounts" />
      <div className="container new-amsterdam-regular mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 rounded-xl">
          {promotions.map((promo, index) => (
            <Card key={index} className="bg-white hover:shadow-2xl transition-shadow duration-700 hover:shadow-slate-600   ease-in-out  border-2 ">
              <CardHeader className="bg-teal-900 text-white p-4">
                <CardTitle className="text-6xl font-extralight text-center ">

                  {promo.discount}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <p className="text-4xl font-light  text-blue-700 mb-2"><span className="text-4xl mr-2">🎟️</span>{promo.code}</p>
                <p className="text-gray-600 h-24 text-3xl mb-4">{promo.description}</p>
                <p className="text-2xl text-gray-500 italic">{promo.expiry}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className=" border-2  mx-auto">
          <CardHeader className="bg-teal-900 text-white p-4">
            <CardTitle className=" text-6xl text-center font-light">Apply A Coupon</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ol className="list-decimal list-inside space-y-2  text-2xl md:text-3xl text-gray-700">
              <li>Choose your preferred bike and rental duration.</li>
              <li>At checkout, locate the <span className=" text-indigo-500" >Promo Code</span> or <span className="text-indigo-500">Coupon</span> field.</li>
              <li>Enter the coupon code exactly as shown (e.g., SUMMER25).</li>
              <li>Click <span className="text-indigo-500">Apply</span> to see the discount reflected in your total.</li>
              <li>Complete your booking with the applied discount!</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CouponsAndDiscount;