export class Estoque {
    constructor(
        public id: number | null,
        public carro: number,
        public quantidade: number,
        public localizacao_patio: string,
        public data_entrada: Date
    ) {}
}