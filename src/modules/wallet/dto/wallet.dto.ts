import { ApiProperty } from "@nestjs/swagger";

export class WalletItem {
  @ApiProperty()
  walletId: number;
  
  @ApiProperty()
  address: string;
  
  @ApiProperty()
  portfolioId: number;
  
  @ApiProperty()
  tokenId: number;
  
  @ApiProperty()
  balance: string;
}