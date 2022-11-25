import pegarArquivo from "./index.js"
import fs from 'fs';
import chalk from "chalk";

const caminho = process.argv

function imprimirLista(lista){
    console.log(chalk.yellow('Lista de links'),lista)
}

async function processarTexto(argumento) {
    const caminho = argumento[2]
    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho)
        imprimirLista(lista)
    }else if(fs.lstatSync(caminho).isDirectory){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async(nomeArquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            console.log(`${caminho}/${nomeArquivo}`)
            imprimirLista(lista)
        })
    }

}

processarTexto(caminho)
