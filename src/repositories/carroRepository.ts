import { executarComandoSQL } from "../database/mysql";
import { Carro } from "../models/Carro";

export class CarroRepositorio {
    private static instance: CarroRepositorio;
    private carroList: Carro[] = [];

    private constructor() { };

    public static getInstance(): CarroRepositorio {
        if (!this.instance) {
            this.instance = new CarroRepositorio();
        }
        return this.instance;
    }

    novoCarro(carro: Carro): String { //Matheus: Não finalizado ainda
        return `
        CREATE TABLE IF NOT EXISTS Cliente (
            id INT AUTO_INCREMENT PRIMARY KEY,
            marca VARCHAR(255) NOT NULL,
            modelo VARCHAR(255) NOT NULL,
            ano number(4) NOT NULL,
            placa VARCHAR(255) NOT NULL,
            preco NUMBER(10, 2) NOT NULL,
            cor VARCHAR(255)
        );        
        `
    }

    async listarCarros(): Promise<Carro[]> {
        const resultado = await executarComandoSQL("SELECT * FROM Carro", []);

        const carrosList: Carro[] = resultado.map((linha: any) => {
            return new Carro(linha.id, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
        });
        return carrosList;
    }

    async buscarPorID(id: number): Promise<Carro | null> {
        const resultado = await executarComandoSQL("SELECT * FROM Carro WHERE id = ?", [id]);

        if (resultado.length === 0) return null;

        const linha = resultado[0];
        return new Carro(linha.id, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
    }

    async buscarPorPlaca(placa: string): Promise<Carro | null> {
        const resultado = await executarComandoSQL("SELECT * FROM Carro WHERE placa = ?", [placa]);

        if (resultado.length === 0) return null;

        const linha = resultado[0];
        return new Carro(linha.id, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
    }

    async atualizarCarro(carroData: any, idAlt: number): Promise<void> {
        let carro: Carro | undefined = this.buscarPorID(idAlt);

        if (carro) {
            await executarComandoSQL(
                "UPDATE Carro SET marca = ?, modelo = ?, ano = ?, placa = ?, preco = ?, cor = ? WHERE id = ?",
                [carroData.marca, carroData.modelo, carroData.ano, carroData.placa, carroData.preco, carroData.cor, idAlt]
            );
        }
    }

    async removerCarro(idRem: number): Promise<void> {
        let carro: Carro | undefined = this.buscarPorID(idRem);

        if(carro){
            await executarComandoSQL("DELETE FROM Carro WHERE id = ?", [idRem]);
        }
    }

    async listarCarrosDisponiveis(): Promise<Carro[]> {
        const resultado = await executarComandoSQL("SELECT * FROM Carro WHERE estoque > 0", []);

        return resultado.map((linha: any) => {
            return new Carro(linha.id, linha.marca, linha.modelo, linha.ano, linha.placa, linha.preco, linha.cor);
        });
    }
}