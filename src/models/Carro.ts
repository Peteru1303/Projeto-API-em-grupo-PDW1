export class Carro {
    id: number
    marca: string
    modelo: string
    ano: number
    placa: string
    preco: number
    cor: string

    constructor(
    marca: string,
    modelo: string,
    ano: number,
    placa: string,
    preco: number,
    cor: string
    ) {
        this.id = this.gerarId();
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.preco = preco;
        this.cor = cor;
    }

    private gerarId(): number {
        return Date.now();
    }
}