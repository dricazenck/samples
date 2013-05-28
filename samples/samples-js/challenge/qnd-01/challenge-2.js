var addEvents = function() {
	var buttons = document.getElementsByTagName("button");

	var acionar = function(indice) {
		alert("Botão " + indice + " acionado!");
	};

	for ( var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		button.onclick = function() {
			acionar(i);
		};
	}
};

//qual é a cagada?
//acessando o i diretamente, deveria passar ele por parametro, para não alterar seu valor, por exemplo:

var sample = function() {
	for ( var j = 0; j < 2; j++) {
		
		var func = function(j) { 
			console.log("*"+j); j++
		}(j);
		console.log("*** "+j);
		
//		var func2 = function(x) { 
//			console.log("---> "+x); x++
//		};
//		func2(j)
//		console.log(">> "+j);
	}
}();

