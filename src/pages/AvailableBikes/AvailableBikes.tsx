import AvailableBikeComponent from "@/components/Bike/AvailableBikeComponent";
import DescriptionSection from "@/components/Shared/DescriptionSection";

const AvailableBikes = () => {
  return (
    <div className="relative    ">
      <DescriptionSection title="All Bikes" />
      <div className="px-4 md:px-8">
        <AvailableBikeComponent />
      </div>
    </div>
  );
};

export default AvailableBikes;