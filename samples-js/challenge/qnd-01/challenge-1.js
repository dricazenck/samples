var count = 4;
function foo() {
    var table = [count]; 
    //undefined pois a criação das variaveis ocorre no inicio do bloco
    
    /* Constrói a tabela. */
    while (count-- > 0) {
    	table.push([]);
    }
    
    /* Atocha números. */
    for (var count = 1; count < table.length; count++) {
        table[count].push(count);
    }
    
    return table;
}

foo(); // Qual o retorno? 

//array undifined