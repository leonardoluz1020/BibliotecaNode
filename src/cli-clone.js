/*  Imports das Lib e FrameWorks */
import validarLinks from './validacao-http.js'
import chalk from 'chalk';
import fs from 'fs';
import pegarArquivo from './index2.js';
const caminho = process.argv;

async function imprimirLista(valida, listas, nomeArquivo = '') {
    if (valida) {
        console.log(
            chalk.yellow('Lista de Links'),
            chalk.bgGreen(nomeArquivo),
           await validarLinks(listas)
        )
    } else {
        console.log(
            chalk.yellow('Lista de Links'),
            chalk.bgGreen(nomeArquivo),
            listas
        )

    }
}

async function processarArquivo(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if(error.code === 'ENOENT'){
            console.log(chalk.red(`Caminho de pasta ou arquivo incorreto!.`))
        }
        return
    }
    
    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho);
        imprimirLista(valida, lista);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`);
            imprimirLista(valida, listas, nomeArquivo)
        })
    }
}

processarArquivo(caminho);