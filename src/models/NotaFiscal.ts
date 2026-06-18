export class NotaFiscal {
    constructor(
        public id: number | null,
        public numero_nota: string,
        public data_emissao: Date,
        public valor_total: number,
        public cliente: number,
        public vendedor: number,
        public carro: number
    ) {}
}