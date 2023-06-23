 const HeroSection = () => {
  return (
    <div className="flex  justify-center items-center flex-row bg-black text-white h-2/4 py-48 gap-12 max-sm:flex-col">
      <div className="flex flex-col justify-start items-start gap-4 max-sm:items-center max-sm:text-sm ">
        <h1 className="font-black text-5xl max-sm:text-3xl">Better when its on</h1>
        <h1 className="text-9xl font-black max-sm:text-3xl">You :)</h1>
        <p className="font-black w-9/12 max-sm:text-sm">
          Purchase the product directly from this website and get discount of
          20%
        </p>
        <button className="bg-primary text-black p-2 rounded-xl w-2/6">Collection</button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-96 h-96 bg-primary rounded-full max-sm:hidden"></div>
      </div>
    </div>
  );
};
export default HeroSection;