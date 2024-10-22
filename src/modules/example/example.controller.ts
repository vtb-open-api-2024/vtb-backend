import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Example')
export class ExampleController {
  constructor(private readonly appService: ExampleService) {}

  @Get('hello')
  public getHello(): string {
    return this.appService.getHello();
  }
}
