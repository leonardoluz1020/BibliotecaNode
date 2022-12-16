import chalk from 'chalk';
import fs from 'fs';

function tratarErro(error){
    throw new Error(chalk.red(error.code, 'Não há arquivo na pasta!.'))    
}

function extrairLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map((captura) => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo'
}


async function pegarArquivo(caminho){
    const encoding = 'utf-8'
    try {
        const texto = await fs.promises.readFile(caminho,encoding)
        return extrairLinks(texto)                
    } catch (error) {
        tratarErro(error)        
    }
}

export default pegarArquivo;

// expressão regular
//  /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm