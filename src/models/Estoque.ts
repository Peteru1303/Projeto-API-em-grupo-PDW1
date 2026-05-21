import { Carro } from "./Carro"

export class Estoque {
    id: number
    carro: Carro
    quantidade: number
    localizacao_patio: string
    preco: number
    data_entrada: Date

    constructor(
        carro: Carro,
        quantidade: number,
        localizacao_patio: string,
        preco: number,
        data_entrada: Date
    ) {
        this.id = this.gerarId();
        this.carro = carro;
        this.quantidade = quantidade;
        this.localizacao_patio = localizacao_patio;
        this.preco = preco;
        this.data_entrada = data_entrada;
    }

    private gerarId(): number {
        return Date.now();
    }
}