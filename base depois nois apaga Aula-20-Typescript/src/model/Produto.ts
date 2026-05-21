import { Fabricante } from "./Fabricante"

export class Produto {
    id: number
    nome: string
    preco: number
    fabricante: Fabricante

    constructor(id: number, nome: string, preco: number, fabricante: Fabricante) {
        this.id = this.gerarId();
        this.nome = nome
        this.preco = preco
        this.fabricante = fabricante
    }

    private gerarId(): number {
        return Date.now();
    }
}
