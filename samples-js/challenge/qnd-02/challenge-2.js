// implementar usando module-pattern e as funções do challenge-1, um módulo que
// contenha a api "quadrado" e "cubo" públicas, valendo!

var module = (function(){

	var QUADRADO = 2;
	var CUBO = 3;

	return {
		quadrado: function(base) {
			return Math.pow(base,QUADRADO);
		},
		cubo: function(base) {
			return Math.pow(base,CUBO);
		}

	};
}()); // implementar essa bosta

console.log(module.quadrado(2)); // 4
console.log(module.quadrado(3)); // 9
console.log(module.quadrado(4)); // 16

console.log(module.cubo(2)); // 8
console.log(module.cubo(3)); // 27
console.log(module.cubo(4)); // 64


