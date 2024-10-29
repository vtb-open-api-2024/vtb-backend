import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ConfigApp {

  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  HOST: string;

  @IsString()
  @IsNotEmpty()
  SWAGGER_PATH: string;

  @IsString()
  @IsNotEmpty()
  ADDRESS: string;
}

export class ConfigDB {
  
  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;
  
  @IsNumber()
  @IsNotEmpty()
  DB_PORT: number;
  
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string
}