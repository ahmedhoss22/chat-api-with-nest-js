import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GooglerDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  provider?: string;
}
