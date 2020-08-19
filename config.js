module.exports = {

    esfera: {
        centro: [0,0,0],
        raio: 1
    },

    camera: {
      x: 0,
      y: 0,
      z: 5
    },
  
    tela: {
      largura: 2.5,
      altura: 2.5,
      posicao_z: 1.5
    },
  
    fonte_luz: {
      x: -5,
      y: -3,
      z: 3
    },
  
    resolucao_imagem: {
      largura: 300,
      altura: 300,
    },
  
    // Brilho/rugosidade do material
    rugosidade: 60,

    // Constante de reflexao especular da esfera
    Ks: 0.75,

    // Constante de reflexao por difusao da esfera
    Kd: {
      R: 0.347893021,
      G: 0.184983674,
      B: 0.447629037
    },
  
    // Intensidade da fonte luminosa
    I: {
      R: 255,
      G: 255,
      B: 255
    },
  
    // Intensidade luminosa do ambiente
    I_amb: {
      R: 60,
      G: 0,
      B: 0
    },
  
    // Componentes consideradas no modelo de Phong
    phong: {
      ambiente: true,
      difusao: true,
      especular: true
    },
  
    // Nome do arquivo da imagem gerada
    nome_imagem: 'images/posicao3'
  }
  