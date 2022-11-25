import fs from 'fs';
import chalk from 'chalk';

function tratarErro(error){
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretorio'))
}

function extrairLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultado = capturas.map((captura) => ({[captura[1]]: captura[2]}))
    return resultado.length !== 0 ? resultado: 'Lista sem Links';
}


async function pegarArquivo(caminho) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminho, encoding)
        return extrairLinks(texto)
    } catch (error) {
        tratarErro(error)

    }
}

export default pegarArquivo;


// expressões regulares para pegar os links do arquivos
//  /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm