// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

contract Payable {
    uint256 balance;
    address payable public owner;

    constructor() {
        //部署合约的时候  交易的时候才会获得  运行时才有的数据
        // 花gas
        owner = payable(msg.sender);
    }

    // 查看合约的余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 存钱
    function deposit() public payable {
        // 任何人都可以存钱
        // payable智能修饰地址类型
        // msg.value 是当前交易发送的以太坊数量
        // 花gas
        balance += msg.value;
    }

    // 取钱
    function withdraw(uint256 amount, address _to) public {
        // 花gas
        require(msg.sender == owner, "Only owner can withdraw");
        require(balance >= amount, "Insufficient balance");
        balance -= amount;
        payable(_to).transfer(amount);
    }
}
