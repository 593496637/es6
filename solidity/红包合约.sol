// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract RedPacket {
    // 定义一个发红包的主体
    address payable public owner;
    // 定义一个发红包的金额
    uint256 public totalAmount;
    // 定义一个发红包的个数
    uint256 public count;

    // 均等红包
    bool public isEven;

    // 记录一下谁抢到了红包
    mapping(address => uint256) public isGetRedPacket;

    constructor(uint256 c, bool _isEqual) payable {
        // 储值的金额 必须大于0
        require(msg.value > 0, "Deposit amount must be greater than 0");
        count = c;
        //  部署合约的
        owner = payable(msg.sender);
        isEven = _isEqual;
        totalAmount = msg.value;
    }

    function getBalance() public view returns (uint256) {
        // 合约也是个普通的账户，有余额;
        // 有的人为了让账户的钱足够的安全，不是把owner指定给一个人，需要几个人一起才能把钱转走
        return address(this).balance;
    }

    // 给合约存钱
    function deposit() public payable {
        // balance +=msg.value;
    }

    // 抢红包
    function getRedPacket() public {
        require(count > 0, "No red packet");
        require(totalAmount > 0, "Red packet amount is 0");
        require(
            isGetRedPacket[msg.sender] == 0,
            "You have already got a red packet"
        );
        isGetRedPacket[msg.sender] = 1;

        if (count == 1) {
            // msg.sender是变化的
            payable(msg.sender).transfer(totalAmount);
            totalAmount = 0;
        } else {
            if (isEven) {
                uint256 amount = totalAmount / count;
                // 给当前调合约的人转钱
                payable(msg.sender).transfer(amount);
                totalAmount -= amount;
            } else {
                // 不均等红包
                // 计算随机数
                uint256 random = ((uint256(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            payable,
                            count
                            totalAmount,
                            block.timestamp,
                        )
                    )
                ) % 8) + 1;

                // 至少1wei
                uint256 amount=(random % (totalAmount / count)) + 1;
                payable(msg.sender).transfer(amount);
                totalAmount -= amount;
            }
        }
        count--;
    }
}
