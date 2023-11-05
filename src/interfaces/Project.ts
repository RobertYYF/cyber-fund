interface Project {
    projectOwner: string;   // 项目所有者地址
    donations: Donation;    // 捐款列表
    totalDonations: number; // 总捐款金额
    projectClosed: boolean; // 项目是否关闭
    startTime: number;      // 项目开始时间
    deadline: number;       // 截止日期
    fundsReleased: boolean; // 资金是否已释放
    approvedDeadline: number; // 批准截止日期
    isApproved: boolean;      // 项目是否已批准
}