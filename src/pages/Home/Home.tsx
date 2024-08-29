import AllBikes from "@/components/Home/AllBikes";
import ContactForm from "@/components/Home/ContactForm";
import CouponsAndDiscount from "@/components/Home/CouponsAndDiscount";
import CustomButton from "@/components/Home/CustomButton";
import HeroSection from "@/components/Home/HeroSection";
import TestiMonial from "@/components/Home/TestiMonial";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import DescriptionSection from "@/components/Shared/DescriptionSection";


const Home = () => {
  return (
    <div className=''>
      <HeroSection />
      <DescriptionSection title="available bikes" />
      <AllBikes />
      <CustomButton />
      <TestiMonial />
      <WhyChooseUs />
      <CouponsAndDiscount />
      <ContactForm />
    </div>
  );
};

export default Home;