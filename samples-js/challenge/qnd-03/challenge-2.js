// implementar duas classes, sendo que uma é herança de outra, e a classe "filha" deverá sobreescrever um método da classe "pai"

//class
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
    
    this.personFull = function () {
    	return "Person name: "+displayName
    	+"\nyearBirth: "+calculeYearBirth()
    	+"\nage: "+this.age+"\n";
    }
};

//public 
person.prototype.show = function () {
	return "=== Show fields person ===\n"+this.personFull();
};


//class
var employee = function (firstname, lastname, age, adjutancy) {
	this.adjutancy = adjutancy;
	
	person.call(this, firstname, lastname, age);
};

//override
employee.prototype.show = function () {
	return "----------------------------" 
	+"\nPerson name: "+this.firstname+" "+this.lastname
	+"\nage: "+this.age
	+"\nadjutancy: "+this.adjutancy;
};

var p = new person("Adriana", "Z", '25');
console.log(p.show());

var p1 = new employee("Rafael", "Z", '26', 'programmer');
console.log(p1.show());