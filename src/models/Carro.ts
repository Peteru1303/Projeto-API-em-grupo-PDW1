export class Carro {
    constructor(
        public id: number | null,
        public marca: string,
        public modelo: string,
        public ano: number,
        public placa: string,
        public preco: number,
        public cor: string
    ) {}
}