import chalk from 'chalk';
import fs from 'fs';
import pegarArquivo from './index2.js'
import listaValidada from './validacao-http.js'

const caminho = process.argv

async function imprimirLista( valida,listas,nomeArquivo = ''){
    if (valida) {
        console.log(
            chalk.yellow('Lista de links'),
            chalk.bgBlue(nomeArquivo),
           await listaValidada(listas)
        )
    }else{
        console.log(
            chalk.yellow('Lista de links'),
            chalk.bgBlue(nomeArquivo),
            listas
        )
    }
}

async function processarTexto(argumento){
    const caminho = argumento[2];
    const valida = argumento[3] === '--valida';
    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if (error.code === 'ENOTFOUND') {
            console.log('Caminho de arquivo ou pasta incorreto!.')
        }
        return                
    }   
    if(fs.lstatSync(caminho).isFile()){
        const lista = await pegarArquivo(caminho);
        imprimirLista( valida,lista)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            imprimirLista( valida,listas,nomeArquivo)
        })
    }    
    
}

processarTexto(caminho)