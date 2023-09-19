import { useState } from "react";

export default ({
  setCreateShipment,
  createShipmentModel,
  createShipment,
}) => {
  const [shipment, setShipment] = useState({
    reciever: "",
    pickupTime: "",
    distance: "",
    price: "",

  });

  const createItem = async () => {
    try {
      await createShipment(shipment)
    } catch (error) {
      console.log("something went wrong");
    }

  };

  return createShipmentModel ? (
    // ... JSX code for the modal
    <div className="fixed inset-0 z-10 overflow-y-atuo">
    <div className="fixed inset-0 w-full h-full bg-black opacity-40"
      onClick={() => setCreateShipment(false)} >
    </div>
    <div className=" flex items-center min-h-screen px-4 py-8">
      <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex justify-end">
          <button
            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
            onClick={() => setCreateShipmentModel(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" w-5 h-5 mx-auto"
              viewBox="0 0 20 20 "
              fill=" currentColor">
              <path
                fill="evenodd"
                d="m4.293 4.29a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293- 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01.414 1.414L8 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

        </div>
        <div className="max-w-sm mx-auto py-3 text-center">
          <h4 className=" text-lg font-medium text-gray-800">
            Track product, create Shipment
            </h4>
          <p
            className=" text-[15px] text-gray-600">
            By adding product you  get realtime update about you product
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mt-3">
              <input type="text"
                placeholder="reciever "
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
         outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({
                  ...shipment,
                  reciever: e.target.value,
                })
                }
              />
            </div>
            <div className="relative mt-3">
              <input type="text"
                placeholder="pickupTime"
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
         outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({
                  ...shipment,
                  pickupTime: e.target.value,
                })
                }
              />
            </div>

            <div className="relative mt-3">
              <input type="text"
                placeholder="distance "
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
         outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({
                  ...shipment,
                  distance: e.target.value,
                })
                }
              />
            </div>
            <div className="relative mt-3">
              <input type="text"
                placeholder="price"
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
         outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({
                  ...shipment,
                  price: e.target.value,
                })
                }
              />
            </div>
            <button onClick={() => createItem()}
              className=" block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 activive:bg-indigo-700
    rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
            >
              create Shipment

            </button>
          </form>
        </div>
      </div>
    </div>
  </div>


  ) : (
    ""
  );
  };