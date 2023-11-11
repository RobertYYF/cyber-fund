interface Donation {
    username: string; // 捐款人名字
    donor: string; // 捐款人地址
    amount: bigint; // 捐款金额
    timestamp: bigint; // 时间戳
    parsedAmount?: number // 转化后的amount
}