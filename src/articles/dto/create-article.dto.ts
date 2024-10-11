import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateArticleDto {

    @IsString()
    @IsNotEmpty({message: "O titulo não pode ficar vazio!"})
    @MinLength(5, {message: "O titulo deve ter mais de 5 caracteres!"})
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({ required: false })
    description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: false })
    published?: boolean = false;
}
