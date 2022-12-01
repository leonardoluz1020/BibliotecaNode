import pegarArquivo from "./index2.js"
import fs from 'fs';
import chalk from "chalk";
import listaValidada from "./validacao-http.js";
const caminho = process.argv

async function imprimirLista(valida, lista, arquivo = '') {
    if (valida) {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.bgBlue(arquivo),
          await listaValidada(lista)
        )
    }else{
        console.log(
            chalk.yellow('Lista de links'),
            chalk.bgBlue(arquivo),
            lista
        )
    }   
}

async function processarTexto(argumento) {
    const caminho = argumento[2]
    const valida = argumento[3] === '--valida'
    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Caminho de diretório ou arquivo inválido'))
        }
        return
    }
    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho)
        imprimirLista(valida, lista)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            imprimirLista(valida, listas, nomeArquivo)
        })
    }
}


processarTexto(caminho)

/*  Process.argv -> caminho -> {

indice 0 (caminho do binario do node)
indice 1 (caminhp da pasta cli onde esta sendo armazenado o process.argv)
indice 2 (leitura da segunda escrito no terminal obs:  podendo colocar dentro dele um caminho de diretorio ou arquivo)
    
}

terminal =>  indice[0](node)  indice[1](src/cli.js) indice[2](./arquivo/texto.md)
terminal => fica assim ( node src/cli.js ./arquivo/texto.md )
script json => "cli": "node src/cli.js ./arquivo/texto.md"
chamar o script no terminal => npm run cli

*/ 