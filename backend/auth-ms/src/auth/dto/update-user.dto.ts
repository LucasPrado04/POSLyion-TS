import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
    @IsNumber()
    @IsPositive()
    id: number
}
