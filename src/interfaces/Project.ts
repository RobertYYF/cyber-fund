interface Project {
    projectOwner: string;   // 项目所有者地址
    totalDonations: number; // 总捐款金额
    projectClosed: boolean; // 项目是否关闭
    startTime: number;      // 项目开始时间
    deadline: number;       // 截止日期
    fundsReleased: boolean; // 资金是否已释放
    approvedDeadline: number; // 批准截止日期
    isApproved: boolean;      // 项目是否已批准
}

export class EtherProject implements Project {
  projectOwner: string;
  totalDonations: number;
  projectClosed: boolean;
  startTime: number;
  deadline: number;
  fundsReleased: boolean;
  approvedDeadline: number;
  isApproved: boolean;

  constructor(
    projectOwner: string,
    totalDonations: number,
    projectClosed: boolean,
    startTime: number,
    deadline: number,
    fundsReleased: boolean,
    approvedDeadline: number,
    isApproved: boolean
  ) {
    this.projectOwner = projectOwner;
    this.totalDonations = totalDonations;
    this.projectClosed = projectClosed;
    this.startTime = startTime;
    this.deadline = deadline;
    this.fundsReleased = fundsReleased;
    this.approvedDeadline = approvedDeadline;
    this.isApproved = isApproved;
  }
}

export default Project;