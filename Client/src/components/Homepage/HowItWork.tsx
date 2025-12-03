import scan from "../../assets/Containerscan-code.png";
import verify from "../../assets/Containerverify-history.png";
import confirm from "../../assets/Containerconfirm-authencity.png";

const HowItWork = () => {
  const cards = [
    {
      id: 1,
      image: scan,
      title: "Scan  Code",
      description:
        "Use your device's camera to scan the unique QR code on the medicine package.",
    },
    {
      id: 2,
      image: verify,
      title: "View History",
      description:
        "Instantly access the medicine's blockchain-verified journey from manufacturer to you.",
    },
    {
      id: 3,
      image: confirm,
      title: "Confirm Authenticity",
      description:
        "Receive clear confirmation that your medication is genuine and safe for use.",
    },
  ];
  return (
    <div className=" p-12">
      {/* texts */}
      <div className=" text-center space-y-3 ">
        <h1 className="text-[#101828] text-3xl">How It Works</h1>
        <p className=" text-[#4A5565]">
          A simple, transparent, and secure process to ensure your peace of
          mind.
        </p>
      </div>
      {/* cards */}
      <div className=" flex ">
        <div className=" flex justify-center gap-6 mt-12 w-full ">
          {cards.map((card) => (
            <div
              key={card.id}
              className=" bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center w-1/3 border border-[#E5E7EB]"
            >
              <img src={card.image} alt={card.title} className=" mb-4" />
              <h2 className=" text-[#101828] text-lg mb-2">
                {card.id}. {card.title}
              </h2>
              <p className=" text-[#4A5565] text-shadow-md px-6">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
