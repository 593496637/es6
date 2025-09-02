// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title RedPacket - 一个可以发红包 & 抢红包的智能合约
contract RedPacket {
    // 发红包的人
    address payable public owner;
    // 红包总金额（wei）
    uint256 public totalAmount;
    // 剩余红包个数
    uint256 public count;
    // 是否均等红包
    bool public isEven;

    // 记录谁已经抢过红包（1 表示抢过）
    mapping(address => uint256) public isGetRedPacket;

    // 防重入锁
    bool private locked;

    // ======== 事件（前端能监听） ========
    event Deposit(address indexed from, uint256 amount); // 存钱
    event Grab(address indexed user, uint256 amount); // 抢红包
    event Withdraw(address indexed to, uint256 amount); // 提现

    // ======== 修饰器 ========
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    // ======== 构造函数 ========
    constructor(uint256 c, bool _isEqual) payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        require(c > 0, "Count must be > 0");
        count = c;
        owner = payable(msg.sender);
        isEven = _isEqual;
        totalAmount = msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // 查询合约余额（真实余额）
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 给合约加钱（并同步记账）
    function deposit() public payable {
        require(msg.value > 0, "No zero deposit");
        totalAmount += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // 抢红包
    function getRedPacket() public noReentrant {
        require(count > 0, "No red packet");
        require(totalAmount > 0, "Red packet amount is 0");
        require(
            isGetRedPacket[msg.sender] == 0,
            "You have already got a red packet"
        );

        // 标记用户已经抢过
        isGetRedPacket[msg.sender] = 1;

        uint256 amount;

        if (count == 1) {
            // 最后一个红包：把剩下的钱全给他
            amount = totalAmount;
        } else {
            if (isEven) {
                // 均等红包：每个人拿到一样的钱
                amount = totalAmount / count;
            } else {
                // 不均等红包：随机分配
                uint256 random = uint256(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            count,
                            totalAmount,
                            block.timestamp
                        )
                    )
                );
                // 随机金额范围：至少 1 wei，最多不超过平均值
                amount = (random % (totalAmount / count)) + 1;
            }
        }

        // 转账给用户（安全写法）
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        require(ok, "Transfer failed");

        // 扣减剩余金额 & 红包数量 -1
        totalAmount -= amount;
        count--;

        // 触发事件
        emit Grab(msg.sender, amount);
    }

    // （可选）合约所有者提现剩余资金
    function withdraw(uint256 amount) public onlyOwner noReentrant {
        require(amount <= address(this).balance, "Not enough balance");
        (bool ok, ) = owner.call{value: amount}("");
        require(ok, "Withdraw failed");
        totalAmount -= amount;
        emit Withdraw(owner, amount);
    }
}
