import { executarComandoSQL } from "../database/mysql";
import { NotaFiscal } from "./../models/NotaFiscal";

export class NotaFiscalRepositorio {
    private static instance: NotaFiscalRepositorio;
    private NotaFiscalList: NotaFiscal[] = [];

    private constructor() { };

    public static getInstance(): NotaFiscalRepositorio {
        if (!this.instance) {
            this.instance = new NotaFiscalRepositorio();
        }
        return this.instance;
    }

    static getCreateTableQuery(): string {
        return `
        CREATE TABLE IF NOT EXISTS NotaFiscal (
            id INT AUTO_INCREMENT PRIMARY KEY,
            numero_nota VARCHAR(255) NOT NULL,
            data_emissao DATE NOT NULL,
            valor_total INT NOT NULL,
            cliente INT NOT NULL,
            vendedor INT NOT NULL,
            carro INT NOT NULL
        );
        `;
    }


    async inserirNotaFiscal(notaFiscal: NotaFiscal): Promise<NotaFiscal> {  
        const resultado = await executarComandoSQL(
            "INSERT INTO NotaFiscal (numero_nota, data_emissao, valor_total, cliente, vendedor, carro) VALUES (?, ?, ?, ?, ?, ?)",
            [notaFiscal.numero_nota, notaFiscal.data_emissao, notaFiscal.valor_total, notaFiscal.cliente, notaFiscal.vendedor, notaFiscal.carro]
        )

        const idGerado = resultado.insertId;

        const newNotaFiscal = new NotaFiscal(idGerado, notaFiscal.numero_nota, notaFiscal.data_emissao, notaFiscal.valor_total, notaFiscal.cliente, notaFiscal.vendedor, notaFiscal.carro);
        
        console.log('Nova nota fiscal inserida com sucesso:', newNotaFiscal);
        return newNotaFiscal;
    }

    async listarNotasFiscais(): Promise<NotaFiscal[]> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal", []);
                    
            const notaFiscal: NotaFiscal[] = linhas.map((linha: any) => {
                return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
            });
    
            return notaFiscal;
        }
    async listarNotasFiscaisVendedor(vendedor: number): Promise<NotaFiscal[]> { //utilizando carro disponivel como referencia
            const resultado = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE vendedor = ?", [vendedor]);
    
            return resultado.map((linha: any) => {
                return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
            });
        }

    async buscarPorID(id: number): Promise<NotaFiscal | null> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE id = ?", [id]);
            
            if (linhas.length === 0) return null;
            
            const linha = linhas[0];
            return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
        }

    async buscarPorNumero(id: number): Promise<NotaFiscal | null> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE id = ?", [id]);
            
            if (linhas.length === 0) return null;
            
            const linha = linhas[0];
            return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
        }
    
    async buscarPorNumeroNota(numero_nota: string): Promise<NotaFiscal | null> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE numero_nota = ?", [numero_nota]);
            
            if (linhas.length === 0) return null;
            
            const linha = linhas[0];
            return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
        }
    async buscarPorNumeroNotaCliente(cliente: number): Promise<NotaFiscal | null> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE cliente = ?", [cliente]);
            
            if (linhas.length === 0) return null;
            
            const linha = linhas[0];
            return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
        }

     async buscarPorNumeroNotaVendedor(vendedor: number): Promise<NotaFiscal | null> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE vendedor = ?", [vendedor]);
            
            if (linhas.length === 0) return null;
            
            const linha = linhas[0];
            return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
        }

    async buscarPorNumeroNotaCarro(carro: number): Promise<NotaFiscal | null> {
            const linhas = await executarComandoSQL("SELECT * FROM NotaFiscal WHERE carro = ?", [carro]);
            
            if (linhas.length === 0) return null;
            
            const linha = linhas[0];
            return new NotaFiscal(linha.id, linha.numero_nota, linha.data_emissao, linha.valor_total, linha.cliente, linha.vendedor, linha.carro);
        }
async atualizarNotaFiscal(notaFiscalData: any, idAlt: number): Promise<void> {
            await executarComandoSQL(
                "UPDATE NotaFiscal SET numero_nota = ?, data_emissao = ?, valor_total = ?, cliente = ?, vendedor = ?, carro = ? WHERE id = ?",
                [notaFiscalData.numero_nota, notaFiscalData.data_emissao, notaFiscalData.valor_total, notaFiscalData.cliente, notaFiscalData.vendedor, notaFiscalData.carro, idAlt]
            )
    }

    async removerEstoque(id: number): Promise<void> {
        await executarComandoSQL("DELETE FROM NotaFiscal WHERE id = ?", [id]);
    }
}
