// Funções úteis para trabalhar com vetores
function to_vector(x, y, z) { return { x: x, y: y, z: z } }
function soma(u, v) { return to_vector(u.x + v.x, u.y + v.y, u.z + v.z) }
function subtracao(u, v) { return to_vector(u.x - v.x, u.y - v.y, u.z - v.z) }
function multiplica(K, v) { return to_vector(K * v.x, K * v.y, K * v.z) }
function produto_escalar(u, v) { return u.x * v.x + u.y * v.y + u.z * v.z }
function modulo(u) { return Math.sqrt(produto_escalar(u,u))}
function normalizar(v) { return multiplica(1/modulo(v), v) }

// Função para fazer conversão de um ponto de coordenada x num intervalo
// [a,b] para um ponto no intervalol [c,d]
function converte(a, b, c, d, x) { 
    return (d-c)*(x-a) /(b-a) + c 
}

// Função para resolver equacao do segundo grau
function bhaskara(a, b, c) {
  const delta = b*b - 4*a*c
  if (delta < 0) return false
  if (delta == 0) {
    return { t: (-b)/(2*a) }
  }
  return {
    t1: (-b+Math.sqrt(delta)) / (2*a),
    t2: (-b-Math.sqrt(delta)) / (2*a)
  }
}

module.exports = {
  to_vector,
  soma,
  subtracao,
  multiplica,
  produto_escalar,
  modulo,
  normalizar,
  converte,
  bhaskara
}