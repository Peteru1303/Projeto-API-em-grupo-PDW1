import { Cliente } from "./Cliente"
import { Vendedor } from "./Vendedor"
import { Carro } from "./Carro"

export class NotaFiscal {
    id: number
    numero_nota: string
    data_emissao: Date
    valor_total: number
    cliente: number
    vendedor: number
    carro: number

    constructor(
        numero_nota: string,
        data_emissao: Date,
        valor_total: number,
        cliente: number,
        vendedor: number,
        carro: number
    ) {
        this.id = this.gerarId();
        this.numero_nota = numero_nota;
        this.data_emissao = data_emissao;
        this.valor_total = valor_total;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.carro = carro;
    }

    private gerarId(): number {
        return Date.now();
    }
}