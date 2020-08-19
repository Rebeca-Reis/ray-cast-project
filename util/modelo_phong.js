const AlgebraLinear = require('./algebra_linear')
const Config = require('./../config')

// Calcula o ponto de intersecao da esfera com um raio que
// sai da camera (x0, y0, z0) e passa por um ponto x, y, z da tela 
function intersecao_raio_esfera(camera, direcao) {

  // Dx^2 + Dy^2 + Dz^2)*t^2 + 2*(x0*Dx + y0*Dy + z0*Dz)*t + (x0^2 + y0^2 + z0^2 - r^2) = 0
  // At^2 + Bt + C
  const A = AlgebraLinear.produto_escalar(direcao, direcao)
  const B = 2 * AlgebraLinear.produto_escalar(direcao, camera)
  const C = AlgebraLinear.produto_escalar(camera,camera) - Config.esfera.raio ** 2
  const raizes = AlgebraLinear.bhaskara(A, B, C)

  if (raizes==false) return false

  // Escolhe t tal que seja a solucao mais proxima da camera
  let t
  if (raizes.t) {
    t = raizes.t
  } else {
    t = Math.min(raizes.t1, raizes.t2)
  }

  //x = x0 + t . Dx, y = y0 + t . Dy, z = z0 + t . Dz
  return AlgebraLinear.soma(camera, AlgebraLinear.multiplica(t, direcao))
}

  // Calcula a cor de um ponto da superficie da esfera
  function calculo_cor_phong(p) {
    // Como a esfera esta centrada na origem e tem raio 1,
    // o vetor normal a superfice no ponto p é o proprio ponto p
    const N = AlgebraLinear.normalizar(p)

    // Luz incidente
    const L = AlgebraLinear.normalizar(AlgebraLinear.to_vector(
      Config.fonte_luz.x - p.x,
      Config.fonte_luz.y - p.y,
      Config.fonte_luz.z - p.z
    ))
 
    // Direcao de visada
    const V = AlgebraLinear.normalizar(AlgebraLinear.to_vector(
      Config.camera.x - p.x,
      Config.camera.y - p.y,
      Config.camera.z - p.z
    ))

    // Direcao de reflexao: R = 2*N - L
    const R = AlgebraLinear.normalizar(AlgebraLinear.subtracao(AlgebraLinear.multiplica(2, N), L))

    let cor = AlgebraLinear.to_vector(0, 0, 0)
    // Reflexao difusa
    if (Config.phong.difusao) {
      cor = AlgebraLinear.soma(cor, AlgebraLinear.to_vector(
        Config.Kd.R * AlgebraLinear.produto_escalar(N,L) * Config.I.R,
        Config.Kd.G * AlgebraLinear.produto_escalar(N,L) * Config.I.G,
        Config.Kd.B * AlgebraLinear.produto_escalar(N,L) * Config.I.B,
      ))
    }
    
    // Reflexao especular
    if (Config.phong.especular) {
      cor = AlgebraLinear.soma(cor, AlgebraLinear.to_vector(
        Config.Ks * (AlgebraLinear.produto_escalar(V,R)**Config.rugosidade) * Config.I.R,
        Config.Ks * (AlgebraLinear.produto_escalar(V,R)**Config.rugosidade) * Config.I.G,
        Config.Ks * (AlgebraLinear.produto_escalar(V,R)**Config.rugosidade) * Config.I.B
      ))
    }
    // Reflexao ambiente
    if (Config.phong.ambiente) {
      cor = AlgebraLinear.soma(cor, AlgebraLinear.to_vector(
        Config.I_amb.R,
        Config.I_amb.G,
        Config.I_amb.B,
      ))
    }
    return {
      R: cor.x,
      G: cor.y,
      B: cor.z
    }
  }
module.exports = {
  intersecao_raio_esfera,
  calculo_cor_phong
}