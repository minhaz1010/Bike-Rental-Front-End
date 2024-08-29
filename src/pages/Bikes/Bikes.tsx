import AllBikes from "@/components/Home/AllBikes";
import DescriptionSection from "@/components/Shared/DescriptionSection";

const Bikes = () => {
  return (
    <div id="bike">
      <DescriptionSection title="all bikes" />
      <AllBikes />
    </div>
  );
};

export default Bikes;