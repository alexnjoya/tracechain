import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../Components/index";

import { TrackingContext } from "../Conetxt/TrackingContext";

const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    CompleteShipement,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  //state variables
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  // Datat state variables
  const [allShipmentsdata, setallShipmentsdata] = useState();
  const [getModal, setGetModal] = useState(false); 

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
    const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    };
  }, []);

  return (
    <>
       <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModal={setGetModel}
        setStartModal={setStartModal}
      />

      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />

     <Form
        createShipmentModel={createShipmentModel}
        createShipmentData={createShipment}
        setCreateShipmentModel={createShipmentModel}
      />

       <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />

    <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        CompleteShipement={CompleteShipement}
      />

       < GetShipment
        setgetModal={getModal}
       setGetModal={setGetModal}
       GetShipment={GetShipment}
      /> 

       <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      /> 
    </>
  );
};

export default index;
