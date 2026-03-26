import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsOptional()
    public dni?: string;
    @IsString()
    @IsOptional()
    public nombreCompleto?: string;
    @IsString()
    @IsOptional()
    public correoElectronico?: string;
    @IsString()
    public nombreUsuario: string;
    @IsString()
    public clave: string;
    @IsBoolean()
    @IsOptional()
    public estado?: boolean = true;
}
