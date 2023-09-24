import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers"; 



// internal import

import tracking from "../Conetxt/Tracking.json"
const ContractAdddress ="0x19484342EdaeF2F84cB3278c1508bd649D9461FC";
const ContractABI = tracking.abi;

// fetching the smart contract
const fetchContract = (signerOrProvider) =>{
  return new ethers.Contract(ContractAdddress, ContractABI, signerOrProvider);
}

export const TrackingContext = React.createContext();
export const TrackingProvider = ({ children }) => {
  // state variables
  const DappName = "project Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const creatItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );

      await creatItem.wait();
      console.log(creatItem);
    } catch (error) {
      console.log("something went worng", error);
    }
  };

  const getAllShipment = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const contract = fetchContract(provider);

     const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));

      return allShipments;
    } catch (error) {
      console.log("error getting shipment", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!wondow.ethereum) return "install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
      return shipmentsCount.toNumber();
    } catch (error) {
      console.log("erro getting shipment", error);
    }
  };

  const completeShipment = async (completeShip) => {
    console.log("CompleteShip", completeShip);

    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const account = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      // console.log("Account", account[0], receiver, index)

      const transaction = await contract.completeShipment(
        account[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.log("wrong complete shipment", error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);
   
    try {
      if (!window.ethereum) return "install MetaMask";
      const account  = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(account[0], index * 1);
      // console.log("Shipment", shipment);
      const singleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };
      return singleShipment;
    } catch (error) {
      console.log("wrong getting shipment", error);
    }
  };

  const startShipment = async (getProduct) => {
   console.log("getProduct", getProduct);
    const {receiver, index} = getProduct;

    try {
      if (!window.ethereum) return "Install MetaMask";
      const account = await window.ethereum.request({
        method:"eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      
      const shipment = await contract.startShipment(
        account[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );

      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log("wrong start shipment", error);
    }
  };

  // check wallet connection status

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "no account";
      }
    } catch (error) {
      console.log("wrong check wallet", error);
    }
  };

  // connect wallet function

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (error) {
      return "something went wrong";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
        checkIfWalletConnected
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
