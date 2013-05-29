var validation = (function () {
    var _jQuery = window.jQuery,

    validateMandatory = function (field) {
        if (field.value != '') {
            field.removeClass('required-field');
            return true;
        } else {
            field.addClass('required-field');
            return false;
        }
    },
    
    validateAllMandatory = function () {
    	var errors = 0;
    	
    	if ( !validateMandatory(_jQuery("#id_cpf")) )
    		errors++;
    	if ( !validateMandatory(_jQuery("#id_email")) )
    		errors++;
    	if ( !validateMandatory(_jQuery("#id_name")) )
    		errors++;
    	if ( !validateMandatory(_jQuery("#id_surname")) )
    		errors++;
    	if ( !validateMandatory(_jQuery('#id_curriculum') && _jQuery('#vacancyId').val() == '' ) 
			errors++;
    	if ( errors > 0 ) {
        	return true;
        } else {
        	return false;
        }
        
    },

    validateFile = function (filename) {
        var valid_extensions = /(\.doc|\.pdf|\.txt|\.docx)$/i;
        if ( valid_extensions.test(filename) ) {
            return true;
        } else {
            return false;
        }
    },
    
    validateCpf = function (strCPF) {
    	var regex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
        if ( regex.test(strCPF) ) {
        	strCPF = strCPF.replace(/\./g, '').replace('-', '');
    		
    		var sum;
    	    var rest;
    	    sum = 0;
    	    if (strCPF === "00000000000") return false;
    	     
    	    for ( i=1; i<=9; i++ ) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    	    rest = (sum * 10) % 11;
    	     
    	    if ( (rest == 10) || (rest == 11))  rest = 0;
    	    if ( rest != parseInt(strCPF.substring(9, 10)) ) return false;
    	     
    	    sum = 0;
    	    for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    	    rest = (sum * 10) % 11;
    	     
    	    if ( (rest == 10) || (rest == 11) )  rest = 0;
    	    if ( rest != parseInt(strCPF.substring(10, 11) ) ) return false;
    	    return true;
        } else
        	return false;
    },

    validateEmail = function () {
    	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if ( !emailReg.test(email) ) {
            return false;
        } else
        	return true;
    },
    
    validateForm = function () {

    	var msg = "";
        _jQuery('#msgs').html("");
        
        if ( validateMandatory($("#id_email") && !validateEmail(_jQuery('#id_email').val()) ) 
            msg = "<div class='error'>Email inválido</div>";
        
        if ( validateMandatory($("#id_cpf") && !validateCpf(_jQuery('#id_cpf').val()) ) 
        	msg = msg + "<div class='error'>Cpf inválido</div>";
        
        if ( validateMandatory(_jQuery('#id_curriculum') && !validateFile(_jQuery('#id_curriculum').val()) ) 
            msg = msg + "<div class='error'>Currículo deve ser: pdf, doc, docx ou txt</div>";

        if ( msg !== "" || !validateAllMandatory() ) {
            if ( requiredField ) {
            	msg = "<div class='error'>Preencha os campos obrigatórios</div>" + msg;
            }
            
            _jQuery('#msgs').removeClass();
            _jQuery('#msgs').html(msg);
            
            return false;
        } else 
        	return true;
    }

    return {
        isValidCpf: function (cpf) {
            return validateCpf(cpf);
        },
        isValidEmail: function (email) {
            return validateEmail(email);
        },
        isValidMandatory: function (field) {
            return validateMandatory(field);
        },
        isValidFile: function (filename) {
            return validateFile(filename);
        },
        isValidForm: function () {
            return validateForm();
        }
    };

}());


var formResponsibilities = (function () {
    
	var _jQuery = window.jQuery,

	message = function ( styleClass, message ) {
	    _jQuery('#msgs').show();
	    _jQuery('#msgs').removeClass('warn error info');
	    _jQuery('#msgs').html(message);
	    _jQuery('#msgs').addClass(styleClass);
	},
	
	clearMessages = function ( field ) {
	    _jQuery('#msgs').show();
	    _jQuery('#msgs').removeClass(); // remove all class
	    _jQuery('#msgs').html("");
	
	    if (field) {
	    	field.removeClass('required-field');
	    }
	},

	showCandidateForm = function () {
	    if ( _jQuery("#vacancyTitle").html() != 'None' ) {
	    	_jQuery("#fields-candidate").show();
	    } else {
	    	_jQuery("#fields-candidate").hide();
	    }
	
	    _jQuery("#type").val('candidated');
	    _jQuery('#fields-add').hide();
	    _jQuery('#file').hide();
	    _jQuery('#to-update').hide();
	    _jQuery('#back').show();
	    _jQuery('#button-arrow').show();
	
	    _jQuery('#lb_Link').html("Candidatar-se");
	    _jQuery('#lb_title').html("Candidatar-se");
	
	    _jQuery('#btn-form').removeClass('blueButton redButton').addClass('greenButton');
	},
	
	showAddForm = function () {
	    _jQuery("#fields-candidate").hide();
	    _jQuery('#to-update').show();
	    _jQuery('#back').hide();
	    _jQuery('#button-arrow').hide();
	    _jQuery('#id_email').val("");
	    _jQuery('#id_cpf').val("");
	},
	
	showUpdateForm = function () {
	    _jQuery("#fields-candidate").hide();
	    _jQuery('#button-arrow').hide();
	    _jQuery("#type").val("update");
	    _jQuery('#fields-add').hide();
	    _jQuery('#to-update').hide();
	    _jQuery('#back').show();
	    _jQuery('#lb_Link').html("Atualizar currículo");
	    _jQuery('#lb_title').html("Alterando cadastro");
	    _jQuery('#btn-form').removeClass('greenButton redButton').addClass('blueButton');
	},

	showInitForm = function () {
	    _jQuery("#fields-candidate").hide();
	    _jQuery("#type").val("add");
	    _jQuery('#to-update').show();
	    _jQuery('#back').hide();
	    _jQuery('#button-arrow').hide();
	    _jQuery('#lb-curriculum').show();
	    _jQuery('#file').show();
	    _jQuery('#fields-add').show();
	    _jQuery('#lb_Link').html("Cadastre-se");
	    _jQuery('#id_name').val("");
	    _jQuery('#id_surname').val("");
	    _jQuery('#btn-form').removeClass('blueButton greenButton').addClass('redButton');
	    _jQuery('#lb_title').html("Ainda não possui cadastro?");
	},

	configureViewForm = function () {
	    if ( _jQuery('#vacancyId').val() != '' ) {
	        showCandidateForm();
	    } else {
	        if ( _jQuery('#type').val() == 'update' ) {
	            showUpdateForm();
	        } else {
	            showAddForm();
	        }
	    }
	},
	
	configureMessages = function () {
	    _jQuery('#msg-bdr').hide();
	    
	    if ( _jQuery('#msg_success').html() == 'Operação realizada com sucesso' ) {
	    	_jQuery('#msg_success').fadeOut(5000);
	    } else {
	    	_jQuery('#msg_success').hide();
	    }
	
	    if ( _jQuery('#msg_success').html() == 'Você já se candidatou para esta vaga' ) {
	        message('warn', _jQuery('#msg_success').html());
	    }
	},

	configureFocusEvents = function () {
		
	    _jQuery('#id_cpf').focusout(function () {
	        
	    	clearMessages(_jQuery('#id_cpf'));
	        
	        if ( !validation.isValidMandatory( _jQuery('#id_cpf').val() )  
	        		|| _jQuery('#id_cpf').val() == '___.___.___-__' ) {
	            message('info', "Campo obrigatório: Cpf");
	        } else {
	        	
	        	if ( !validation.isValidCpf(_jQuery('#id_cpf').val()) ) {
	        		 message('info', "Formato de CPF inválido");
	            } else {
	            	if ( validation.isValidEmail(_jQuery('#id_email').val()) {
	            		requestCandidate();	
	            	}
	            }
	        }
	        
	    });
	
	    _jQuery('#id_email').focusout(function () {
	        clearMessages(_jQuery('#id_email'));
	        
	        if ( !validation.isValidMandatory( _jQuery('#id_email').val()) {
	            message('info', "Campo obrigatório: email");
	        } else {
	        	
	        	if ( !validation.isValidCpf(_jQuery('#id_email').val()) ) {
	        		 message('info', "Formato de email inválido");
	            } else {
	            	if ( validation.isValidEmail(_jQuery('#id_email').val()) {
	            		requestCandidate();	
	            	}
	            }
	        }
	        
	    });
	
	    _jQuery('#id_name').focusout(function () {
	        clearMessages(_jQuery('#id_name'));
	        if ( validation.isValidMandatory(_jQuery('#id_name').val()) ) {
	            message('info', "Campo obrigatório: nome");
	        }
	    });
	
	    _jQuery('#id_surname').focusout(function () {
	        clearMessages(_jQuery('#id_surname'));
	        if ( validation.isValidMandatory(_jQuery('#id_surname').val()) ) {
	            message('info', "Campo obrigatório: sobrenome");
	        }
	    });
	},

	configureChangeEvents = function () {
	    
		_jQuery('#id_cpf').change(function () {
	        configureMaskFields();
	    });
	
	    _jQuery('#id_curriculum').change(function () {
	        clearMessages(_jQuery('#id_curriculum'));
	
	        if ( validation.isValidMandatory(_jQuery('#id_curriculum').val()) ) {
	            message('info', "Campo obrigatório: currículo");
	        } else {
	
	            if ( !validation.isValidFile(_jQuery('#id_curriculum').val()) ) {
	                message('info', 'Currículo deve ser: pdf, doc, docx ou txt') {}
	            }
	        });
	    },
	
	    configureClickEvents = function () {
	        
	    	_jQuery('#btn_file').click(function () {
	            _jQuery('#id_curriculum').click();
	        });
	
	        _jQuery('#btn-sou').click(function () {
	            showUpdateForm();
	        });
	
	        _jQuery('#lb_arrow').click(function () {
	            if ( _jQuery('.arrow-down').html() == '' ) {
	                _jQuery('#file').show();
	                _jQuery('#lb-curriculum').hide();
	                _jQuery('.arrow-down').removeClass('arrow-down').addClass('arrow-up');
	            } else {
	                _jQuery('.arrow-up').removeClass('arrow-up').addClass('arrow-down');
	                _jQuery('#file').hide();
	                _jQuery('#lb-curriculum').show();
	            }
	        });
	
	        _jQuery('#btn-back').click(function () {
	            showInitForm();
	        });
	
	    },
	
	    configureMaskFields = function () {
	        _jQuery('#id_cpf').unmask();
	        _jQuery('#id_cpf').mask('999.999.999-99');
	    },
	
	    sendForm = function () {
	        if ( validation.validateForm() ) {
	            _jQuery('#id_cpf').val(_jQuery('#id_cpf').val().replace(/\./g, '').replace('-', ''));
	            document.getElementById('form').submit();
	        }
	    }, 
	    
	    configRequestCandidate = function(candidate) {
			
			_jQuery('#btn-form').show();
			_jQuery('#msg-bdr').hide();
			
			_jQuery('#id_name').val(candidate.name);
			_jQuery('#id_surname').val(candidate.surname);
	        
	        if ( _jQuery("#type").val() ==  'add' ) {
	        	message("warn", "Você já possui cadastro.")
	        }
	        
	        showUpdateForm();
	        
	        if ( _jQuery('#vacancyId').val() == '' ) {
	        	_jQuery('#file').show();
	        } else {
	        	showCandidateForm();
	        }
	        
		}, 
		
		configRequestEmpty = function () {
			if ( _jQuery("#type").val() ===  'update' 
			  || _jQuery("#type").val() === 'candidated' ) {
				message("warn", "Você ainda não possui cadastro.");
		    }
		    showInitForm();
		},
		
		configRequestError = function (candidate) {
			
			_jQuery('#back').hide();
	    	_jQuery('#to-update').hide();
	    	_jQuery('#btn-form').hide();
	    	_jQuery('#msg-bdr').show();
	    	
	    	if ( candidate.existMail !== undefined ) {
	    		message("warn", "Email vinculado a outro CPF");
	    	} else {
	    		message("warn", "CPF vinculado a outro email");
	    	}
		},
		
		requestCandidate = function () {
			var cpf = _jQuery('#id_cpf').val().replace(/\./g, '').replace('-', '');
		    var url = ['http://', window.location.host, '/get/',_jQuery('#id_email').val(),'/',cpf,'/'].join('');
			
			_jQuery.get(url, function(data) {
	        	
	            if (data != '{}') { 
	                var candidate = JSON.parse(data);
	                
	                if (candidato.name !== undefined) {
	                	configRequestCandidate(candidate);
	                } else {
	                	configRequestError(candidate);
	                }
	            } else {
	            	configRequestEmpty();
	            }
	        });
		}

    return {
    	init: function () {
            configureChangeEvents();
            configureFocusEvents();
            configureClickEvents();
            configureMessages();
            configureMaskFields();
            configureViewForm();
        }
    };
}(validation));