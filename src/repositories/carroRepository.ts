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
            preco VARCHAR(255),
            cor VARCHAR(255)
        );        
        `
    }

    listarCarros(): Carro[] {
        return this.carroList;
    }

    buscarPorID(id: number): Carro | undefined {
        return this.carroList.find(carro => carro.id === id);
    }

    buscarPorPlaca(placa: string): Carro | undefined {
        return this.carroList.find(carro => carro.placa === placa);
    }

    atualizarCarro(carroData: any, idAlt: number): void {
        let carro: Carro | undefined = this.buscarPorID(idAlt);

        if (carro) {
            carro.marca = carroData.marca;
            carro.modelo = carroData.modelo;
            carro.ano = carroData.ano;
            carro.placa = carroData.placa;
            carro.preco = carroData.preco;
            carro.cor = carroData.cor;
        }
    }

    removerCarro(idRem: number): void {
        let carro: Carro | undefined = this.buscarPorID(idRem);

        if(carro){
            let index = this.carroList.indexOf(carro);
            this.carroList.splice(index, 1);
            /* ou pop */
        }
    }
    //Adicionar função de listar carros com estoque maior que 0
}