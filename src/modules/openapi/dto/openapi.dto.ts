import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum ProductType {
  CARD = 'CARD',
  ACCOUNT = 'ACCOUNT'
}

export enum TransactionType {
  INCOME = 'INCOME', 
  EXPENSE = 'EXPENSE',
}

export class GetBalanceDtoReq {

  @ApiProperty({
    description: 'тип продукта',
    enum: ProductType,
    example: ProductType.CARD
  })
  type: ProductType;

  @ApiProperty({
    description: 'номер карты или счета',
  })
  id: string;
}

export class GetTransactionDtoReq {

  @ApiProperty({
    description: 'тип продукта',
    enum: ProductType,
    example: ProductType.CARD
  })
  type: ProductType;

  @ApiProperty({
    description: 'номер карты или счета',
  })
  id: string;

  @ApiProperty({
    description: 'дата начала периода (в формате YYYY-MM-DD)',
    example: '2024-01-01',
  })
  startDate: string;

  @ApiProperty({
    description: 'Дата окончания периода (в формате YYYY-MM-DD)',
    example: '2024-12-31',
  })
  endDate: string;
}

export class GetTransactionDtoRes {
  @ApiProperty({
    description: 'Тип продукта',
    enum: ProductType,
    example: ProductType.CARD,
  })
  type: ProductType;

  @ApiProperty({
    description: 'ID продукта (номер карты или счета)',
    example: '1234567890123456',
  })
  productId: string;

  @ApiProperty({
    description: 'Дата транзакции (в формате YYYY-MM-DD)',
    example: '2024-01-01',
  })
  transactionDate: string;

  @ApiProperty({
    description: 'Время транзакции (в формате HH:mm:ss)',
    example: '14:30:00',
  })
  transactionTime: string;

  @ApiProperty({
    description: 'Уникальный ID транзакции',
    example: 'tx_00123456789',
  })
  transactionId: string;

  @ApiProperty({
    description: 'Тип транзакции',
    enum: TransactionType,
    example: TransactionType.INCOME,
  })
  transactionType: TransactionType;

  @ApiProperty({
    description: 'Сумма транзакции',
    example: 150.75,
  })
  amount: number;

  @ApiProperty({
    description: 'Валюта транзакции',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    description: 'Уникальный ID мерчанта',
    example: 'merchant_12345',
  })
  merchantId: string;

  @ApiProperty({
    description: 'Название мерчанта (юрлица)',
    example: 'Acme Corporation',
  })
  merchantName: string;

  @ApiProperty({
    description: 'Категория мерчанта',
    example: 'Супермаркеты',
  })
  merchantCategory: string;

  @ApiProperty({
    description: 'Мета платежа (например, номер телефона за который была оплата)',
    example: '+1234567890',
  })
  paymentMeta: string;
}

export class GetBalanceDtoRes {
  @ApiProperty({
    description: 'доступный остаток средств',
  })
  balance: number;
  @ApiProperty({
    description: 'валюта',
  })
  currency: number;
}