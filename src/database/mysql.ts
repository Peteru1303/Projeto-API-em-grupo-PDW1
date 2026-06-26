import mysql, { Connection, QueryError } from 'mysql2';
import { ClienteRepositorio } from '../repositories/clienteRepository';
import { VendedorRepositorio } from '../repositories/vendedorRepository';
import { CarroRepositorio } from '../repositories/carroRepository';
import { EstoqueRepositorio } from '../repositories/estoqueRepository';
import { NotaFiscalRepositorio } from '../repositories/notaFiscalRepository';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'project2',
    password: 'Project2',
    database: 'project2'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexao bem-sucedida com o banco de dados MySQL');
});

export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}

export async function inicializarBanco(): Promise<void> {
    console.log('Sincronizando schemas do banco de dados...');
    

    const schemas = [
        ClienteRepositorio.getCreateTableQuery(),
        VendedorRepositorio.getCreateTableQuery(),
        CarroRepositorio.getCreateTableQuery(),
        EstoqueRepositorio.getCreateTableQuery(),
        NotaFiscalRepositorio.getCreateTableQuery(),
    ];

    try {
        await executarComandoSQL(`USE ${dbConfig.database}`, []);
        console.log(`Conectado ao schema: ${dbConfig.database}`);

        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log('Todos os repositorios foram inicializados com sucesso.');
    } catch (err) {
        console.error('Erro critico na sincronizacao dos repositorios:', err);
        process.exit(1);
    }
}
