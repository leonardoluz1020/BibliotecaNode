import chalk from 'chalk';
import fs from 'fs';

function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultado = capturas.map((captura) => ({ [captura[1]]: captura[2] }))
    return resultado.length !== 0 ? resultado : 'Não contém links'
}

function tratarErro(error){
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório'))
}

async function pegarArquvivo(caminho) {
    const encoding = 'utf-8'
    try {
        const texto = await fs.promises.readFile(caminho, encoding)
        return extrairLinks(texto)
    } catch (error) {
        tratarErro(error)
    }
}

export default pegarArquvivo;


// expressões regulares para pegar os links do arquivos
//  /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm