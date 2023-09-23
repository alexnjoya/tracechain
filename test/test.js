const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Tracking Contract', function () {
  let trackingContract;
  let owner;
  let sender;
  let receiver;

  beforeEach(async () => {
    [owner, sender, receiver] = await ethers.getSigners();
    const Tracking = await ethers.getContractFactory('Tracking');
    trackingContract = await Tracking.deploy();
    await trackingContract.deployed();
  });

  it('should create a shipment', async function () {
    const pickupTime = Math.floor(Date.now() / 1000);
    const distance = 100;
    const price = ethers.utils.parseEther('1.0');

    await trackingContract.connect(sender).createShipment(receiver.address, pickupTime, distance, price);

    const shipment = await trackingContract.getShipment(sender.address, 0);
    const [s_sender, s_receiver, s_pickupTime, s_deliveryTime, s_distance, s_price, s_status, s_isPaid] = shipment
    
    console.log("shipmentts", s_pickupTime.toNumber())
    expect(s_sender).to.equal(sender.address);
    expect(s_receiver).to.equal(receiver.address);
    expect(s_pickupTime.toNumber()).to.equal(pickupTime);
    // expect(s_deliveryTime.toNumber()).to.equal(distance);
    expect(s_price).to.equal(price);
    expect(s_status).to.equal(0); // ShipmentStatus.PENDING
    expect(s_isPaid).to.equal(false);
  });


  it('should start a shipment', async function () {
    const pickupTime = Math.floor(Date.now() / 1000);
    const distance = 100;
    const price = ethers.utils.parseEther('1.0');

    await trackingContract.connect(sender).createShipment(receiver.address, pickupTime, distance, price);
    await trackingContract.connect(owner).startShipment(sender.address, receiver.address, 0);
    const [s_sender, s_receiver, s_pickupTime, s_deliveryTime, s_distance, s_price, s_status, s_isPaid] = shipment

    const shipment = await trackingContract.getShipment(sender.address, 0);
    expect(shipment[5]).to.equal(1); // ShipmentStatus.IN_TRANSIT
  });

  it('should complete a shipment', async function () {
    const pickupTime = Math.floor(Date.now() / 1000);
    const distance = 100;
    const price = ethers.utils.parseEther('1.0');

    await trackingContract.connect(sender).createShipment(receiver.address, pickupTime, distance, price);
    await trackingContract.connect(owner).startShipment(sender.address, receiver.address, 0);
    await trackingContract.connect(owner).completeShipment(sender.address, receiver.address, 0);

    const shipment = await trackingContract.getShipment(sender.address, 0);
    expect(shipment.status).to.equal(2); // ShipmentStatus.DELIVERED
    expect(shipment.isPaid).to.equal(true);
  });

  it('should get shipment count', async function () {
    const pickupTime = Math.floor(Date.now() / 1000);
    const distance = 100;
    const price = ethers.utils.parseEther('1.0');

    await trackingContract.connect(sender).createShipment(receiver.address, pickupTime, distance, price);
    const count = await trackingContract.getShipmentCount(sender.address);
    expect(count).to.equal(1);
  });

  // it('should get all transactions', async function () {
  //   const pickupTime = Math.floor(Date.now() / 1000);
  //   const distance = 100;
  //   const price = ethers.utils.parseEther('1.0');

  //   await trackingContract.connect(sender).createShipment(receiver.address, pickupTime, distance, price);
  //   await trackingContract.connect(owner).startShipment(sender.address, receiver.address, 0);
  //   await trackingContract.connect(owner).completeShipment(sender.address, receiver.address, 0);

  //   const transactions = await trackingContract.getAllTransactions();
  //   expect(transactions.length).to.equal(1);
  // });
});
