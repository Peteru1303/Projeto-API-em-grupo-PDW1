import { executarComandoSQL } from "../database/mysql";
import { Vendedor } from "../models/Vendedor";

export class VendedorRepositorio {
    private static instance: VendedorRepositorio;
    private vendedorList: Vendedor[] = []; // talvez nao vai precisar disso

    private constructor() { };

    public static getInstance(): VendedorRepositorio {
        if (!this.instance) {
            this.instance = new VendedorRepositorio();
        }
        return this.instance;
    }

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Vendedor (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            matricula VARCHAR(14) NOT NULL,
            comissao_percentual VARCHAR(20) NOT NULL
        );
        `;
    }


    async novoVendedor(vendedor: Vendedor): Promise<Vendedor> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Vendedor (nome, matricula, comissao_percentual) VALUES (?, ?, ?)",
            [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]
        )

        const idGerado = resultado.insertId;

        const newVendedor = new Vendedor(idGerado, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
        
        console.log('Novo vendedor inserido com sucesso:', newVendedor);
        return newVendedor;
    }


    async listarVendedor(): Promise<Vendedor[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Vendedor", []);
                
        const vendedor: Vendedor[] = linhas.map((linha: any) => {
            return new Vendedor(linha.id, linha.nome, linha.matricula, linha.comissao_percentual);
        });

        return vendedor;
    }

    async buscarPorID(id: number): Promise<Vendedor | null> {
        const linhas = await executarComandoSQL("SELECT * FROM Vendedor WHERE id = ?", [id]);
                
        if (linhas.length === 0) return null;
        
        const linha = linhas[0];
        return new Vendedor(linha.id, linha.nome, linha.cpf, linha.comissao_percentual);
    }

    async existeMatricula(matricula: string): Promise<boolean> {
        const linhas = await executarComandoSQL("SELECT * FROM Vendedor WHERE matricula = ?", [matricula]);
                
        if (linhas.length === 0) return false;
        return true;
    }

    async atualizarVendedor(vendedorData: any, id: number): Promise<Vendedor> {
        let vendedorAtualizado = await executarComandoSQL(
            "UPDATE Vendedor SET nome = ?, matricula = ?, comissao_percentual = ? WHERE id = ?",
            [vendedorData.nome, vendedorData.matricula, vendedorData.comissao_percentual, id]
        );
        return vendedorAtualizado;
    }

    async removerVendedor(id: number): Promise<void> {
        await executarComandoSQL("DELETE FROM Vendedor WHERE id = ?", [id]);
    }
    //Adicionar função de retornar as notas fiscais de um vendedor
    //possivelmente reutilizar a função busca id e exportar a nota fiscal do vendedor?
}