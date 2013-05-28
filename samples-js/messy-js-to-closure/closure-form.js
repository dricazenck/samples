var validation = (function()
{
	var validateCpf = function (strCPF) {
		// TODO
	},
	validateCpf = function () 
	{
		// TODO
	},
	validateEmpty = function (field) 
	{
		if (field.value != '')
			return true;
		else return false;
	}, 
	validateFile = function (filename)
	{
		var valid_extensions = /(\.doc|\.pdf|\.txt|\.docx)$/i;   
		if( valid_extensions.test(filename) ){ 
		   return true;
		} else {
		  return false;
		}
	}
	
	return {
		isValidCpf : function(cpf) {
			return validateCpf(cpf);
		},
		isValidEmail : function(email) {
			return validateCpf(email);
		},
		isEmpty : function(field) {
			return validateEmpty(field);
		},
		isValidFile : function isValidFile(filename) {
			return validateFile(filename);
		}
	};
	
}());


var formResponsibilities = (function() 
{
	var message = function(styleClass, message) 
	{
		jQuery('#msgs').show();
	    jQuery('#msgs').removeClass('warn error info');
	    jQuery('#msgs').html(message);
	    jQuery('#msgs').addClass(styleClass); 
	}, 
	
	clearMessages = function(field)
	{
		jQuery('#msgs').show();
	    jQuery('#msgs').removeClass(); // remove all class
	    jQuery('#msgs').html(""); 
	    
	    if( field )
	    	field.removeClass('required-field');
	},
	
	configureFocusEvents = function() 
	{
		jQuery('#id_cpf').focusout(function() {
			clearMessages(jQuery('#id_cpf'));
			if ( validation.isValidCpf(jQuery('#id_cpf').val()) ) {
	            message('info', "Formato de CPF inválido");
	        }
	    });
	
	    jQuery('#id_email').focusout(function() {
	    	clearMessages(jQuery('#id_email'));
	    	if ( validation.isValidCpf(jQuery('#id_email').val()) ) {
	            message('info', "Formato de email inválido");
	        } 
	    });
	
	    jQuery('#id_name').focusout(function() {
	    	clearMessages(jQuery('#id_name'));
	    	if ( validation.isEmpty(jQuery('#id_name').val()) ) { 
	            message('info', "Campo obrigatório: nome");
	    	}
	    });
	    
    	jQuery('#id_surname').focusout(function() {
	    	clearMessages(jQuery('#id_surname'));
	    	if ( validation.isEmpty(jQuery('#id_surname').val()) ) { 
	            message('info', "Campo obrigatório: sobrenome");
	    	}
	    });
    	
	},
	
	configureChangeEvents = function()
	{
		jQuery('#id_cpf').change(function() {
			
	        // TODO validate_mask();
	    }); 
	    
	    jQuery('#id_curriculum').change(function() {
	    	clearMessages(jQuery('#id_curriculum'));
	    	
	    	if ( validation.isEmpty(jQuery('#id_curriculum').val()) ) { 
	            message('info', "Campo obrigatório: currículo");
	    	} else {
	        	
	        	if( !validation.isValidFile(jQuery('#id_curriculum').val()) ) {
	        		message('info', 'Currículo deve ser: pdf, doc, docx ou txt') {
	        	}
	        }
	    });
	},
	
	configureClickEvents = function() 
	{    
	    jQuery('#btn_file').click(function() {
	        jQuery('#id_curriculum').click();
	    });
	
	    jQuery('#btn-sou').click(function() 
		{
	    	// TODO showUpdateCurriculum();
	    });
	
	    jQuery('#lb_arrow').click(function() 
	    {
	        if( jQuery('.arrow-down').html() == '' ) { 
	            jQuery('#file').show();
	            jQuery('#lb-curriculum').hide();
	            jQuery('.arrow-down').removeClass('arrow-down').addClass('arrow-up');
	        }else {
	            jQuery('.arrow-up').removeClass('arrow-up').addClass('arrow-down');
	            jQuery('#file').hide();
	            jQuery('#lb-curriculum').show();
	        }
	    });
	    
	    jQuery('#btn-back').click(function() {
	    		// TODO clearFields();
	    });
		
	}

	return {
		message : function(styleClass, message) {
			return changeMessages(styleClass, message)
		},
		clearMessages : function(base) {
			return clearMessages();
		},
		configure : function() {
			configureChangeEvents();
			configureFocusEvents();
			configureClickEvents();
		}
	};
}(validation));