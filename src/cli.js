import pegarArquivo from "./index.js"
import fs, { chownSync } from 'fs';
import chalk from "chalk";

const caminho = process.argv

function imprimiLista(lista) {
    console.log(chalk.yellow('Lista de links'), lista)
}

async function processarTexto(argumento) {
    const caminho = argumento[2]

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegarArquivo(caminho)
        imprimiLista(resultado)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDoarquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeDoarquivo}`)
            console.log(`${caminho}/${nomeDoarquivo}`)
            imprimiLista(lista)
        })
    }
}

processarTexto(caminho)

