import { useState, useEffect } from "react";
import Image from "next/image"; // Changed 'image' to 'Image'
import images from "../Images/index";

export default ({
  openProfile,
  setOpenProfile,
  currentUser,
  getShipmentCount,
}) => {
  const [count, setCount] = useState();

  useEffect(() => {
    const getShipmentData = getShipmentCount;

    return async () => {
      const allData = await getShipmentData;
      setCount(allData);
    };
  }, []);

  return openProfile ? (
    <div className="fixed inset-0 z-10 overflow-y-auto"> {/* Changed 'overflow-y-atuo' to 'overflow-y-auto' */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40" // Changed 'opaacity-40' to 'opacity-40'
        onClick={() => setOpenProfile(false)} // Changed 'setCreateShipment(false)' to 'setOpenProfile(false)'
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setOpenProfile(false)} // Changed 'setCreateShipmentMode(false)' to 'setOpenProfile(false)'
            > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10
                8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 
                1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586
                 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 text-center">
            <Image // Changed 'image' to 'Image'
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={images.avatar}
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"> {/* Changed 'class' to 'className' */}
              Welcome Trader
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400"> {/* Changed 'class' to 'className' */}
              {currentUser}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2"
              >
                Balance: 345 ETH
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2"
              >
                Total Shipment: {count}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
