pragma solidity ^0.4.2;

contract SimpleRegistry {

    struct Message {
        uint time;
        string message;
        address sender;
    }

    mapping(address => Message) public messages;

    function sendMessage(address receiver, string message) returns(bool sent) {
      messages[receiver].time = 10;
      messages[receiver].message = message;
      messages[receiver].sender = msg.sender;
      return true;
    }

    function getMessage(address addr) returns(string message) {
      return messages[addr].message;
    }
}
