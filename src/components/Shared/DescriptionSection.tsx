import bike from "../../assets/motor-bike.jpeg"
type TTitle = {
  title: string
}

const DescriptionSection = ({ title }: TTitle) => {
  return (
    <div id="description" className=" flex justify-center flex-col new-amsterdam-regular my-11 items-center">
      <img src={bike} className="size-28 object-contain" alt="bike" />
      <h2 className="text-3xl whitespace-nowrap sm:text-5xl md:text-7xl text-pretty animate-pulse  transition-shadow shadow-[#EDEADE] shadow-lg drop-shadow-lg rounded-xl p-5 uppercase">{title}</h2>
    </div>
  );
};

export default DescriptionSection;