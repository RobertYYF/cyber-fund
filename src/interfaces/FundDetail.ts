interface FundDetail {
  id?: number;
  title?: string;
  category?: string;
  author?: string;
  intro?: string;
  content?: string;
  start?: string;
  end?: string;
  raised_fund?: number;
  target_fund?: number;
}

export default FundDetail;