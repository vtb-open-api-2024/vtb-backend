import { WalletItem } from "src/modules/wallet/dto/wallet.dto";

export interface PortfolioItem {
  title: string;
  portfolioId: number;
  wallets: WalletItem[];
}