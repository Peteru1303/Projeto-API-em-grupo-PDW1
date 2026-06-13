import { executarComandoSQL } from "../database/mysql";
import { Cliente } from "./../models/Cliente";

export class ClienteRepositorio {
    private static instance: ClienteRepositorio;
    private ClienteList: Cliente[] = []; // precisa disso?

    private constructor() { };

    public static getInstance(): ClienteRepositorio {
        if (!this.instance) {
            this.instance = new ClienteRepositorio();
        }
        return this.instance;
    }

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Cliente (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(14) NOT NULL,
            telefone VARCHAR(20) NOT NULL,
            email VARCHAR(255),
            cidade VARCHAR(255)
        );
        `;
    }

    async inserirCliente(cliente: Cliente): Promise<Cliente> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Cliente (nome, cpf, telefone, email, cidade) VALUES (?, ?, ?, ?, ?)",
            [cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade]
        );

        const idGerado = resultado.insertId;

        const newCliente = new Cliente(idGerado, cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.cidade);

        console.log('Cliente inserido com sucesso:', newCliente);
        return newCliente;
    }

    async listarClientes(): Promise<Cliente[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Cliente", []);
        
        const clientes: Cliente[] = linhas.map((linha: any) => {
            return new Cliente(linha.id, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
        });
        
        return clientes;
    }

    async buscarPorID(id: number): Promise<Cliente | null> {
        const linhas = await executarComandoSQL("SELECT * FROM Cliente WHERE id = ?", [id]);
        
        if (linhas.length === 0) return null;
        
        const linha = linhas[0];
        return new Cliente(linha.id, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }

    async buscarPorCPF(cpf: string): Promise<Cliente | null> {
        const linhas = await executarComandoSQL("SELECT * FROM Cliente WHERE cpf = ?", [cpf]);
        
        if (linhas.length === 0) return null;
        
        const linha = linhas[0];
        return new Cliente(linha.id, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }

    async atualizarCliente(clienteData: any, id: number): Promise<void> {
        await executarComandoSQL(
            "UPDATE Cliente SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ? WHERE id = ?",
            [clienteData.nome, clienteData.cpf, clienteData.telefone, clienteData.email, clienteData.cidade, id]
        );
    }

    async removerCliente(id: number): Promise<void> {
        await executarComandoSQL("DELETE FROM Cliente WHERE id = ?", [id]);
    }
}