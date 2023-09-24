export default ({ setCreateShipmentModel, allShipmentsdata }) => {
  const converTime = (time) => {
    console.log( "Time:", time)
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  console.log(allShipmentsdata);
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className="text-gray-600 mt-2">
            Create and track all your products
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            onClick={() => setCreateShipmentModel(true)}
            href="javascript:void(0)"
            className=" inline-block px-4 py-2 text-white duration-150 font-medium
        bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm
         rounded-lg md:line-flex"
          >
            Add Tracking
          </p>
        </div>
      </div>

      <div className=" mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className=" py-3 px-6">Sender</th>
              <th className=" py-3 px-6">Receiver</th>
              <th className=" py-3 px-6">PickUpTime</th>
              <th className=" py-3 px-6">Distance </th>
              <th className=" py-3 px-6">Price</th>
              <th className=" py-3 px-6">Delvery Time </th>
              <th className=" py-3 px-6">Paid </th>
              <th className=" py-3 px-6">Status </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsdata?.map((shipment, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-noWrap">
                  {shipment.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowWrap">
                  {shipment.receiver.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-noWrap">
                  {converTime(shipment.pickupTime)}
                </td>
                <td className="px-6 py-4 whitespace-noWrap">
                  {shipment.distance} Km
                </td>
                <td className="px-6 py-4 whitespace-noWrap">
                  {shipment.price}
                </td>
                <td className="px-6 py-4 whitespace-noWrap">
                  {shipment.deliveryTime}
                </td>
                <td className="px-6 py-4 whitespace-noWrap">
                  {shipment.isPaid ? "Completed" : "Not Complete"}
                </td>
                <td className="px-6 py-4 whitespace-noWrap">
                  {shipment.status == 0 ? "  PENDNG" : shipment.status == 1 ? "IN_TRANSIT" : "Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
