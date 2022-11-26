import chalk from 'chalk'
import fs from 'fs'
import pegarArquivo from './index.js'
import listaValidada from './http.js'
const caminho = process.argv

function imprimiLista(valida, lista, arquvivo = '') {
    
    if (valida) {
        console.log(
            chalk.yellow('Lista validada'),
            chalk.black.bgBlue(arquvivo),
            listaValidada(lista)
        )
    }else{
        console.log(
            chalk.yellow('Lista de links'),
            chalk.black.bgBlue(arquvivo),
            lista
        )
    }
}

async function processarTexto(argumento) {
    const caminho = argumento[2]
    const valida = argumento[3] === '--valida';


    try {
        fs.lstatSync(caminho)
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('Caminho de pasta ou arquivo errado'))
        }
        return
    }
    if (fs.lstatSync(caminho).isFile()) {
        const lista = await pegarArquivo(caminho)
        imprimiLista( valida ,lista)
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeArquivo) => {
            const listas = await pegarArquivo(`${caminho}/${nomeArquivo}`)
            imprimiLista(valida ,listas, nomeArquivo);
        });
    }
}

processarTexto(caminho)
