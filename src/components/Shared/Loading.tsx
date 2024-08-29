type TMessage = {
  message: string
}
const Loading = ({ message }: TMessage) => {
  return (
    <div className="flex flex-col min-h-96 justify-center items-center ">
      <div className="w-24 h-24 border-4 border-t-4 border-t-transparent border-green-500 rounded-full animate-spin mb-4"></div>
      <p className="text-green-500 text-3xl md:text-5xl jersey-10-regular font-medium animate-pulse duration-1000 repeat-infinite">. . . {message} . . .</p>
    </div>
  );
};

export default Loading;
