import { executarComandoSQL } from "../database/mysql";
import { Estoque } from "../models/Estoque";

export class EstoqueRepositorio {
    private static instance: EstoqueRepositorio;
    private estoqueList: Estoque[] = [];

    private constructor() { };

    public static getInstance(): EstoqueRepositorio {
        if (!this.instance) {
            this.instance = new EstoqueRepositorio();
        }
        return this.instance;
    }

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS Estoque (
            id INT AUTO_INCREMENT PRIMARY KEY,
            carro VARCHAR(255) NOT NULL,
            quantidade VARCHAR(14) NOT NULL,
            localizacao_patio VARCHAR(20) NOT NULL,
            data_entrada VARCHAR(20) NOT NULL
        );
        `;//Parametros incorreto, perguntar pro professor como representar cada um
    }

    async novoEstoque(estoque: Estoque): Promise<Estoque> {
        const resultado = await executarComandoSQL(
            "INSERT INTO Estoque (id, carro, quantidade, localizacao_patio, data_entrada) VALUES (?, ?, ?, ?)",
            [estoque.carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada]
        )

        const idGerado = resultado.insertId;

        const newEstoque = new Estoque(idGerado, estoque.carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada);
        
        console.log('Novo Estoque inserido com sucesso:', newEstoque);
        return newEstoque;
    }

    async listarEstoque(): Promise<Estoque[]> {
        const linhas = await executarComandoSQL("SELECT * FROM Estoque", []);
                
        const estoque: Estoque[] = linhas.map((linha: any) => {
            return new Estoque(linha.id, linha.carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
        });

        return estoque;
    }

    async buscarPorID(id: number): Promise<Estoque | null> {
        const linhas = await executarComandoSQL("SELECT * FROM Estoque WHERE id = ?", [id]);
                
        if (linhas.length === 0) return null;
        
        const linha = linhas[0];
        return new Estoque(linha.id, linha.carro, linha.quantidade, linha.localizacao_patio, linha.data_entrada);
    }

     async atualizarEstoque(estoqueData: any, id: number): Promise<Estoque> {
        let estoqueAtualizado = await executarComandoSQL(
            "UPDATE Estoque SET carro = ?, quantidade = ?, localizacao_patio = ?, data_entrada = ?, WHERE id = ?",
            [estoqueData.carro, estoqueData.quantidade, estoqueData.localizacao_patio, estoqueData.data_entrada, id] //ultima virgula possivelmente desnecessaria?
        );
        return estoqueAtualizado;
    }
    async removerEstoque(id: number): Promise<void> {
        await executarComandoSQL("DELETE FROM Estoque WHERE id = ?", [id]);
    }
    //Adicionar função de retornar o estoque de carro especifico
}