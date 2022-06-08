
export default class Operation {
    constructor(Concepto = "", Monto = 0, Fecha ="", Tipo_Operacion = 0, Id_Categoria = 0, Id_Usuario = 0) {
        this.Concepto = Concepto;
        this.Monto = Monto;
        this.Fecha = Fecha;
        this.Tipo_Operacion = Tipo_Operacion;
        this.Id_Categoria = Id_Categoria;
        this.Id_Usuario = Id_Usuario;
    }
}