import { ApiProperty } from "@nestjs/swagger";

export class TokenItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  blockchainId: number; 
  
  @ApiProperty()
  blockchainTitle: string; 
}
export class TokenRefDtoRes {
  @ApiProperty({
    type: Array<TokenItem>,
    example: [
      { 
        id: 0, 
        title: 'usdt',
        blockchainId: 0,
        blockchainTitle: 'ethereum'
      },
    ]
  })
  items: TokenItem[];
}