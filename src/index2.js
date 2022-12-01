import chalk from 'chalk';
import fs from 'fs';

function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }))
    return resultados.length !== 0 ? resultados : 'Não há links'
}
function trataErro(error){
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório'))
}

async function pegarArquivo(arquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(arquivo, encoding)
        return extrairLinks(texto)
    } catch (error) {
        trataErro(error)
    }
}

export default pegarArquivo;

//  /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm