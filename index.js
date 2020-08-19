
const Jimp = require('jimp')
const Config = require('./config')
const AlgebraLinear = require('./util/algebra_linear')
const ModeloPhong = require('./util/modelo_phong')

function cor_pixel(camera, direcao) {
    const p = ModeloPhong.intersecao_raio_esfera(camera, direcao)
    if (!p) return [false, false]
    
    // Reflexao de Phong
    const cor = ModeloPhong.calculo_cor_phong(p)

    // Limita a cor ao intervalo [0, 255], já que está no padrao RGB
    function limita_cor(x) {
    return Math.max(0, Math.min(255, Math.round(x)))
    }
    
    // Associa o ponto a uma cor, e a converte para hexadecimal
    return [p, Jimp.rgbaToInt(
    limita_cor(cor.R),
    limita_cor(cor.G),
    limita_cor(cor.B),
    255)]
}

const img = new Jimp(Config.resolucao_imagem.largura, Config.resolucao_imagem.altura, (erro) => {
    if (erro) throw erro
});

// Percorre cada pixel da imagem e vai colorindo
for (const { x, y } of img.scanIterator(0, 0, img.bitmap.width, img.bitmap.height)) {
    // Converte ponto da imagem para ponto na tela 
    const p_tela = AlgebraLinear.to_vector(
    AlgebraLinear.converte(0, img.bitmap.width, -Config.tela.largura/2, Config.tela.largura/2, x),
    AlgebraLinear.converte(0, img.bitmap.height, -Config.tela.altura/2, Config.tela.altura/2, y),
    Config.tela.posicao_z
    )

    const direcao_raio = AlgebraLinear.subtracao(p_tela, Config.camera)
    const [p, cor] = cor_pixel(Config.camera, direcao_raio)

    // se nao tem intersecao com a esfera, nao faz nada
    if (cor==false || p==false) continue
    // Pinta o pixel
    img.setPixelColor(cor, x, y)
}

// Salva a imagem gerada
img.write(`${Config.nome_imagem}.jpg`)
