// implementar uma "classe" com atributos/métodos privados

var person = function(firstname, lastname, age) {
	
	//public
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    
    //private
	var displayName = this.firstname+" "+this.lastname;
        
    //private
    function calculeYearBirth() {
    	var year = new Date().getFullYear();
    	return parseInt(year)-parseInt(age);
    }
    
    //public 
    this.toString = function() {
    	return "Person name: "+displayName
    	+"\nage: "+this.age
    	+"\nyearBirth: "+calculeYearBirth();
    };
};

var p1 = new person("Adriana", "Zencke", '25');
console.log(p1.toString());