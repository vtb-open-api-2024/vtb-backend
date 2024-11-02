import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService as PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
