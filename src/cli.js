import chalk from 'chalk';
import fs from 'fs';
import pegarArquivo from './index.js';

const caminho = process.argv

function imprimirTexto(lista, arquivo = '') {
    console.log(
        chalk.yellow('Lista de links'),
        chalk.black.bgGreen(arquivo),
        lista
    )
}

async function processarTexto(argumento) {
    const caminho = argumento[2]

    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Caminho de pasta ou arquivo inválido'))
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho)
        imprimirTexto(lista)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            imprimirTexto(listas, nomeArquivo)
        })
    }
}

processarTexto(caminho)
