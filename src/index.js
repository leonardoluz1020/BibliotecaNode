import chalk from 'chalk'
import fs from 'fs'

function trataErro(error){
    throw new Error(chalk.red(error.code, 'Não a arquivo no diretorio'))
}

function extrairLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map((captura) => ({[captura[1]]:captura[2]}))
    return resultados
}

async function pegarArquivo(caminho){
    try {
        const encoding = 'utf-8'
    const texto = await fs.promises.readFile(caminho, encoding)
    console.log(extrairLinks(texto))
    } catch (error) {
        trataErro(error)
    }

}

pegarArquivo('./arquivos/texto.md')




// expressões regulares para pegar os links do arquivos
//  /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm