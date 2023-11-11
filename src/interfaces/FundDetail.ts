interface FundDetail {
  projectId?: number;
  projectName?: string;
  projectOwner?: string;
  startTime?: number;
  deadline?: number;
  projectDescription?: string;
  approvalDeadline?: number;
  category?: string;
  intro?: string;
  raised_fund?: number;
  projectGoal?: number;
  totalDonations?: number;
  fundReleased?: boolean;
  isApproved?: boolean;
  projectClosed?: boolean;
}

export class FundDetailClass {
  constructor(
    public projectId?: number,
    public projectName?: string,
    public projectOwner?: string,
    public startTime?: number,
    public deadline?: number,
    public projectDescription?: string,
    public approvalDeadline?: number,
    public category?: string,
    public intro?: string,
    public raised_fund?: number,
    public projectGoal?: number,
    public totalDonations?: number,
    public fundReleased?: boolean,
    public isApproved?: boolean,
    public projectClosed?: boolean
  ) {}
}

export default FundDetail;