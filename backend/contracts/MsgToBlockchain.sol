// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MsgToBlockchain {
    string message;

    function setMessage(string memory _message) external {
        message = _message;
    }

    function getMessage() external view returns(string memory) {
        return message;
    }
}
