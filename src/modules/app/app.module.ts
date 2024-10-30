import { Module } from '@nestjs/common';
import { SchemaModule } from 'src/schema/schema.module';
import { AuthModule } from '../auth/auth.module';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [
    SchemaModule,
    AuthModule,
    PortfolioModule,
  ],
})
export class AppModule {}
