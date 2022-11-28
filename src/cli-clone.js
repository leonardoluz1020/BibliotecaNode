import pegarArquivo from "./index2.js";
import fs from 'fs';
import chalk from "chalk";
import listaValidada from "./validacao-http.js";
const caminho = process.argv

async function imprimirLista(valida, lista, arquivo = ''){

    if (valida) {
        console.log(
            chalk.bgYellow('Lista de links'),
            chalk.bgBlue(arquivo),
          await listaValidada(lista)
        )        
    } else {
        console.log(
            chalk.bgYellow('Lista de links'),
            chalk.bgBlue(arquivo),
            lista
        )        
    }    
}

async function processarTexto(argumento){
     const caminho = argumento[2];
     const valida = argumento[3] === '--valida';
     try {
        fs.lstatSync(caminho)
     } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Caminho de arquivo ou diretorio incorreto'))
        }
        return
     }

    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho)
        imprimirLista(valida ,lista)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async(nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            imprimirLista(valida,listas, nomeArquivo)
        })
    }
}

processarTexto(caminho)
