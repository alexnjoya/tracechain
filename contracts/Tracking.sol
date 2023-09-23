// SPX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }
    // declaration of variable used
    struct Shipment {
        address sender;
        address reciever;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    struct TyepShipment {
        address sender;
        address reciever;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    TyepShipment[] tyepShipments;

    event ShipmentCreated(
        address indexed sender,
        address indexed reciever,
        uint256 pickupTime,
        uint256 distance,
        uint256 price
    );
    event ShipmentInTransit(
        address indexed sender,
        address indexed reciever,
        uint256 pickupTime
    );
    event ShipmentDelivered(
        address indexed sender,
        address indexed reciever,
        uint256 deliveryTime
    );
    event ShipmentPaid(
        address indexed sender,
        address indexed reciever,
        uint256 amount
    );

    constructor() {
        shipmentCount = 0;
    }

    //  users creating their shipment
    function createShipment(
        address _reciever,
        uint256 _pickupTime,
        uint256 _distance,
        uint256 _price
    ) public payable {
        require(msg.value == _price, "Payment amount must match the price,");

        Shipment memory shipment = Shipment(
            msg.sender,
            _reciever,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        tyepShipments.push(
            TyepShipment(
                msg.sender,
                _reciever,
                _pickupTime,
                0,
                _distance,
                _price,
                ShipmentStatus.PENDING,
                false
            )
        );

        emit ShipmentCreated(
            msg.sender,
            _reciever,
            _pickupTime,
            _distance,
            _price
        );
    }

    // shiping company start their shipping  company
    function startShipment(
        address _sender,
        address _reciever,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        require(shipment.reciever == _reciever, "Invalid reciever.");
        require(
            shipment.status == ShipmentStatus.PENDING,
            "Shipment already in transit."
        );

        shipment.status = ShipmentStatus.IN_TRANSIT;
        tyepShipment.status = ShipmentStatus.IN_TRANSIT;
        emit ShipmentInTransit(_sender, _reciever, shipment.pickupTime);
    }

    // shipping is completed
    function completeShipment(
        address _sender,
        address _reciever,
        uint256 _index
    ) public payable {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        require(shipment.reciever == _reciever, "Invalid reciever.");
        require(
            shipment.status == ShipmentStatus.IN_TRANSIT,
            "Shipment ot in transit."
        );
        require(!shipment.isPaid, "Shipment already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        tyepShipment.status = ShipmentStatus.DELIVERED;
        tyepShipment.deliveryTime = block.timestamp;
        shipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        payable(_reciever).transfer(amount);

        shipment.isPaid = true;
        tyepShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _reciever, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _reciever, amount);
    }

    // here the end user get their items delivered
    function getShipment(
        address _sender,
        uint256 _index
    )
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            ShipmentStatus,
            bool
        )
    {
        Shipment memory shipment = shipments[_sender][_index];
        return (
            shipment.sender,
            shipment.reciever,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.distance,
            shipment.price,
            shipment.status,
            shipment.isPaid
        );
    }

    // here the user is able to track the number of shipment made
    function getShipmentCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

    // user make payment after recieving their goods
    function getAllTransactions() public view returns (TyepShipment[] memory) {
        return tyepShipments;
    }
}
