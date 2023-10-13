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
}

export default FundDetail;