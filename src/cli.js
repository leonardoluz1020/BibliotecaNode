import chalk from "chalk";
import pegarArquivo from "./index.js";

const caminho = process.argv

async function processaTexto(caminho){
    const arquivos = await pegarArquivo(caminho[2])
    console.log(chalk.yellow('Lista de Links'), arquivos)
}

processaTexto(caminho)