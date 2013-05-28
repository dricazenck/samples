try {
    JSON.parse('Throw some error');
} catch (e) {
    var x = "It doesn't introduce a new scope, but";
    console.log(typeof e);
}

console.log("X: "+x);
console.log(typeof e); // pq não existe?
//criam uma camada a mais no encadeamento de contexto