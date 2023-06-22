export const HeroSection = () => {
  return (
    <div className="flex  justify-center items-center flex-row bg-black text-white h-2/4 py-48 gap-12">
      <div className="flex flex-col justify-start items-start gap-4 ">
        <h1 className="font-black text-5xl">Better when its on</h1>
        <h1 className="text-9xl font-black">You :)</h1>
        <p className="font-black w-9/12">
          Purchase the product directly from this website and get discount of
          20%
        </p>
        <button className="bg-primary text-black p-2 rounded-xl w-2/6">Collection</button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-96 h-96 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};
