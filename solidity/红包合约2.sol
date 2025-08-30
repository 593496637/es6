// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title 简单红包合约
 * @dev 最简单的红包实现：创建一次，抢完为止
 */
contract SimpleRedPacket {
    // 红包创建者
    address public owner;
    // 红包总金额
    uint256 public totalAmount;
    // 剩余金额
    uint256 public remainingAmount;
    // 红包总数
    uint256 public totalCount;
    // 剩余红包数
    uint256 public remainingCount;
    // 是否均分红包（true=均分，false=随机）
    bool public isEven;
    // 记录谁已经抢过红包
    mapping(address => bool) public hasClaimed;

    /**
     * @dev 创建红包
     * @param _count 红包数量
     * @param _isEven 是否均分
     */
    constructor(uint256 _count, bool _isEven) payable {
        require(msg.value > 0, "Must send ETH to create red packet");
        require(_count > 0, "Count must be greater than 0");

        owner = msg.sender;
        totalAmount = msg.value;
        remainingAmount = msg.value;
        totalCount = _count;
        remainingCount = _count;
        isEven = _isEven;
    }

    /**
     * @dev 抢红包
     */
    function claimRedPacket() external {
        // 基础检查
        require(remainingCount > 0, "No red packets left");
        require(remainingAmount > 0, "No amount left");
        require(!hasClaimed[msg.sender], "Already claimed");

        // 标记已领取
        hasClaimed[msg.sender] = true;

        uint256 amount;

        if (remainingCount == 1) {
            // 最后一个红包，把剩余的都给他
            amount = remainingAmount;
        } else {
            if (isEven) {
                // 均分红包
                amount = totalAmount / totalCount;
            } else {
                // 随机红包
                amount = _getRandomAmount();
            }
        }

        // 更新状态
        remainingAmount -= amount;
        remainingCount--;

        // 转账
        payable(msg.sender).transfer(amount);
    }

    /**
     * @dev 生成随机金额
     */
    function _getRandomAmount() private view returns (uint256) {
        // 计算平均金额
        uint256 avg = remainingAmount / remainingCount;

        // 生成随机数：1 到 平均值*2 之间
        uint256 random = (uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, remainingAmount)
            )
        ) % (avg * 2)) + 1;

        // 确保不超过可分配的最大金额
        uint256 maxAmount = remainingAmount - (remainingCount - 1);
        if (random > maxAmount) {
            random = maxAmount;
        }

        return random;
    }

    /**
     * @dev 获取合约余额
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev 红包创建者取回剩余金额（可选功能）
     */
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(remainingAmount > 0, "Nothing to withdraw");

        uint256 amount = remainingAmount;
        remainingAmount = 0;
        remainingCount = 0;

        payable(owner).transfer(amount);
    }
}
