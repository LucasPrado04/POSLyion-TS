export class Usuario {
    public id: number;
    public dni?: string;
    public nombreCompleto?: string;
    public correoElectronico?: string;
    public nombreUsuario: string;
    public clave: string;
    public estado?: boolean = true;
}
