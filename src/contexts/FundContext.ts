import { createContext } from 'react';
import FundDetail from '@/interfaces/FundDetail';

interface FundDetailContextType {
  fundDetailList: FundDetail[] | [];
  setFundDetail: (fundDetail: FundDetail[] | []) => void;
}

export const FundDetailContext = createContext<FundDetailContextType>({
  fundDetailList: [],
  setFundDetail: () => {},
});