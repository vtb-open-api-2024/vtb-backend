import { ApiProperty } from "@nestjs/swagger";

export class BlockchainItem {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
}
export class BlockchainRefDtoRes {

  @ApiProperty({
    type: Array<BlockchainItem>,
    example: [
      { id: 0, title: 'ethereum' },
      { id: 1, title: 'bitcoin' },
      { id: 3, title: 'solana' },
    ]
  })
  items: BlockchainItem[];
}