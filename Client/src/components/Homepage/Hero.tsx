import bg from "../../assets/hero-banner.jpg";
import heroIcon from "../../assets/hero-icon.png";

const Hero = () => {
  return (
    <div
      className=" h-screen relative flex justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        // height: "500px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay */}
      <div className=" absolute h-full w-full bg-[#FFFFFFFA] opacity-10 z-[-99]"></div>
      {/* contents */}
      <div className=" p-6 flex flex-col items-center text-center">
        {/* icon */}
        <div>
          <img src={heroIcon} alt="" />
        </div>
        {/* verify */}
        <div>
          {/* text */}
          <div>
            <h2 className=" text-[#101828] text-3xl mb-4">
              Verify Your Medicine
            </h2>
            <p>Ensure your medication is genuine and safe with a quick scan.</p>
          </div>
          {/* button */}
          <button className=" w-full bg-primary-faint text-white py-4 px-6 mt-6 rounded-lg hover:bg-primary-deep">
            Scan QR Code to Verify
          </button>
        </div>
        {/* or */}
        <div className=" flex items-center mt-6">
          <hr className=" w-[180px] border-t border-gray-300 " />
          <span className=" text-gray-500 bg-[#F8FAFC] p-1 px-4">or</span>
          <hr className=" w-[180px]  border-t border-gray-300" />
        </div>
        {/* manual */}
        <div className="p-4 rounded-[14px] bg-[#FFFFFF] mt-6 flex flex-col items-center space-y-4 w-full">
          <h1 className=" text-[#314158] text-xl">Enter Batch Code Manually</h1>
          {/* input */}
          <input
            type="text"
            placeholder="e.g.. BATCH-2024-001"
            className=" bg-[#F3F3F5] border border-[#00000000] rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-faint"
          />
          {/* button */}
          <button className=" w-full bg-primary-faint text-white py-3 px-6 rounded-lg hover:bg-primary-deep">
            Verify Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
