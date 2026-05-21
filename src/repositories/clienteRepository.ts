import { Cliente } from "./../models/Cliente";

export class ClienteRepositorio {
    private static instance: ClienteRepositorio;
    private ClienteList: Cliente[] = [];

    private constructor() { };

    public static getInstance(): ClienteRepositorio {
        if (!this.instance) {
            this.instance = new ClienteRepositorio();
        }
        return this.instance;
    }

    inserirCliente(Cliente: Cliente): void {
        this.ClienteList.push(Cliente);
    }


    listarClientes(): Cliente[] {
        return this.ClienteList;
    }

    buscarPorID(id: number): Cliente | undefined {
        return this.ClienteList.find(client => client.id === id);
    }

    atualizarCliente(ClienteData: any, id: number): void {
        const index = this.ClienteList.findIndex(client => client.id === id);

        if (index !== -1) {
            this.ClienteList[index].nome = ClienteData.nome;
            this.ClienteList[index].cpf = ClienteData.cpf;
            this.ClienteList[index].telefone = ClienteData.telefone;
            this.ClienteList[index].email = ClienteData.email;
            this.ClienteList[index].cidade = ClienteData.cidade;
        }
    }

    removerCliente(id: number): void {
        const index = this.ClienteList.findIndex(client => client.id === id);

        if (index !== -1) {
            this.ClienteList.splice(index, 1);
        }
    }
}