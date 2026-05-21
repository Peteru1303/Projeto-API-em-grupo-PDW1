export class Cliente {
    id: number
    nome: string
    cpf: string
    telefone: string
    email: string
    cidade: string

    constructor(
        id: number, 
        nome: string, 
        cpf: string, 
        telefone: string,
        email: string,
        cidade: string
    ) {
        this.id = this.gerarId();
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.cidade = cidade;
    }

    private gerarId(): number {
        return Date.now();
    }
}
