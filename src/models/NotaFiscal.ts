import { Cliente } from "./Cliente"
import { Vendedor } from "./Vendedor"
import { Carro } from "./Carro"

export class NotaFiscal {
    id: number
    numero_nota: string
    data_omissao: Date
    valor_total: number
    cliente: Cliente
    vendedor: Vendedor
    carro: Carro

    constructor(
        numero_nota: string,
        data_omissao: Date,
        valor_total: number,
        cliente: Cliente,
        vendedor: Vendedor,
        carro: Carro
    ) {
        this.id = this.gerarId();
        this.numero_nota = numero_nota;
        this.data_omissao = data_omissao;
        this.valor_total = valor_total;
        this.cliente = cliente;
        this.vendedor = vendedor;
        this.carro = carro;
    }

    private gerarId(): number {
        return Date.now();
    }
}