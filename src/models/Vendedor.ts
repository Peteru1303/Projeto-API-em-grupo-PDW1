export class Vendedor {
    id: number
    nome: string
    matricula: string
    comissao_percentual: number

    constructor(
        nome: string,
        matricula: string,
        comissao_percentual: number,
    ) {
        this.id = this.gerarId();
        this.nome = nome;
        this.matricula = matricula;
        this.comissao_percentual = comissao_percentual;
    }

    private gerarId(): number {
        return Date.now();
    }
}