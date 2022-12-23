import pegarArquivo from "./index2.js";
import fs from 'fs';
import chalk from "chalk";
import validarLinks from "./validacao-http.js";

const caminho = process.argv

async function imprmirLista(valida, listas, nomeArquivo = ''){
    if (valida) {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.bgBlue(nomeArquivo),
          await  validarLinks(listas)
        );
    } else {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.bgBlue(nomeArquivo),
            listas
        );
    }
}


async function processarTexto(argumento) {
    const caminho = argumento[2];
    const valida = argumento[3] === '--valida';
    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Caminho de pasta ou arquivo incorreto!.'))
        }
        return
    }
    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho);
        imprmirLista(valida, lista);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const resultados = await fs.promises.readdir(caminho);
        resultados.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`);
            imprmirLista(valida, listas, nomeArquivo);
        })
    }
}
processarTexto(caminho);