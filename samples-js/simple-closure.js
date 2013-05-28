var validation = (function()
{
	var validateCpf = function (strCPF) 
	{
		console.log('validation cpf '+strCPF);
		if (strCPF != '')
			return true;
		else
			return false;
	},
	validateEmail = function (strEmail) 
	{
		console.log('validation email '+strEmail);
		if (strEmail != '')
			return true;
		else
			return false;
	}
	
	return {
		isValidCpf : function(cpf) 
		{
			return validateCpf(cpf)
		},
		isValidEmail : function(cpf) 
		{
			return validateEmail(cpf)
		}
	};
}());

//validation.isValidCpf('123456789');


var formResponsibilities = (function() 
{
	var message = function(message)
	{
		console.log("show message: "+message);
	}, 
	clearMessages = function()
	{
		console.log("remove all messages");
	}
	
	return {
		message : function(msg) {
			
			//call the other model 
			console.log(validation.isValidEmail(msg));
			
			return message(msg);
		},
		clearMessages : function(base) {
			return clearMessages();
		}
	};
}(validation));

formResponsibilities.message("dricazenck");
