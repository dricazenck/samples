function init() {
	displayForm();    
    configFormMessage();
    validate_mask();
    configInputEvents();
}

function changeFormToCandidate() {
	if(jQuery("#vacancyTitle").html() != 'None')
		jQuery("#fields-candidate").show();
	else
		jQuery("#fields-candidate").hide();
	
    jQuery("#type").val('candidated');
    jQuery('#fields-add').hide();
    jQuery('#file').hide();
    jQuery('#to-update').hide();
    jQuery('#back').show();
    jQuery('#button-arrow').show();

    jQuery('#lb_Link').html("Candidatar-se");
    jQuery('#lb_title').html("Candidatar-se");

    jQuery('#btn-form').removeClass('blueButton redButton').addClass('greenButton');      
}

function styleMsgs(newsClass){
	jQuery('#msgs').show();
    jQuery('#msgs').removeClass('warn error info');
    jQuery('#msgs').html("");
    jQuery('#msgs').addClass(newsClass); 
}

function sendForm() {
    if (validateFieldsCandidate()) {
        jQuery('#id_cpf').val(jQuery('#id_cpf').val().replace(/\./g, '').replace('-', ''));
        document.getElementById('form').submit();    
    }
}

function validate_mask(){
    jQuery('#id_cpf').unmask();
    jQuery('#id_cpf').mask('999.999.999-99');
}

function validateFieldsCandidate() {
    jQuery('#msgs').html("");

    var msg = "";
    var requiredField = false; 
    var cpf = jQuery('#id_cpf').val();

    if (jQuery('#id_email').val() == '') { 
    	jQuery('#id_email').addClass('required-field');
    	requiredField = true;
    } else {
    	jQuery('#id_email').removeClass('required-field');
        if(!isValidMail(jQuery('#id_email').val())) {
            msg = "<div class='error'>Email inválido</div>";
        }
    }
    if (cpf.length == 0  ||
        cpf == '___.___.___-__') {
    	jQuery('#id_cpf').addClass('required-field');
    	requiredField = true;
    } else {
    	jQuery('#id_cpf').removeClass('required-field');
        if (!isValidCPF(cpf)) {
            msg = msg + "<div class='error'>Cpf inválido</div>";
        }
    }
    if (jQuery('#id_name').val() == '') { 
    	requiredField = true;
    	jQuery('#id_name').addClass('required-field');
    }else {
    	jQuery('#id_name').removeClass('required-field');
    }
    if (jQuery('#id_surname').val() == '') { 
    	jQuery('#id_surname').addClass('required-field');
    	requiredField = true;
    }else{
    	jQuery('#id_surname').removeClass('required-field');
    }
    if (jQuery('#id_curriculum').val() == '' && jQuery('#vacancyId').val() == '') { 
    	requiredField = true;
    	jQuery('#id_curriculum').addClass('required-field');
    } else {
    	jQuery('#id_curriculum').removeClass('required-field');
    	
    	if((jQuery('#id_curriculum').val() != '' && !isValidFile(jQuery('#id_curriculum').val())) 
    			&& jQuery('#vacancyId').val() != '') {
    		msg = msg + "<div class='error'>Currículo deve ser: pdf, doc, docx ou txt</div>";
    	}
    }
    
    if (msg !== "" || requiredField) {
        styleMsgs('');
        
        if(requiredField)
        	msg = "<div class='error'>Preencha os campos obrigatórios</div>"+msg;
        
        jQuery('#msgs').html(msg);
        return false;    
    } else {
        return true;
    }
        
}

function getCandidate() {

    var cpf = jQuery('#id_cpf').val().replace(/\./g, '').replace('-', '');
    var url = ['http://', window.location.host, '/get/',
                jQuery('#id_email').val(),'/',cpf,'/'].join('');
    
    if(isValidMail(jQuery('#id_email').val()) && isValidCPF(jQuery('#id_cpf').val())) {
        jQuery.get(url, function(data) {
        	jQuery('#btn-form').show();
        	jQuery('#msg-bdr').hide();
        	
            if (data != '{}') { 
                var candidato = JSON.parse(data);
                
                if (candidato.name !== undefined) {
                	
	                jQuery('#id_name').val(candidato.name);
	                jQuery('#id_surname').val(candidato.surname);
	                
	                if(jQuery("#type").val() ==  'add') {
	                	styleMsgs('warn');
	                	jQuery('#msgs').html("Você já possui cadastro.");	
	                }
	                showUpdateCurriculum();
	                
	                if (jQuery('#vacancyId').val() == '')
	                    jQuery('#file').show();
	                else
	                    changeFormToCandidate();
                } else {
                	styleMsgs('warn');
                	jQuery('#back').hide();
                	jQuery('#to-update').hide();
                	jQuery('#btn-form').hide();
                	jQuery('#msg-bdr').show();
                	
                	if (candidato.existMail) {
                		jQuery('#msgs').html("Email vinculado a outro cpf");	
                	}else{
                		jQuery('#msgs').html("Cpf vinculado a outro email");
                	}
                	
                }
                	
            } else {
                
                if(jQuery("#type").val() ==  'update' || jQuery("#type").val() == 'candidated') {
                	styleMsgs('warn');
                	jQuery('#msgs').html("Você ainda não possui cadastro.");	
                }
                clearFields();
            }
        });
    }
}

function showAddCurrilum(){
	jQuery("#fields-candidate").hide();
    jQuery('#to-update').show();
    jQuery('#back').hide();
    jQuery('#button-arrow').hide();
    jQuery('#id_email').val("");
    jQuery('#id_cpf').val("");
}

function showUpdateCurriculum() {
	jQuery("#fields-candidate").hide();
    jQuery('#button-arrow').hide();
    jQuery("#type").val("update");
	jQuery('#fields-add').hide();
    jQuery('#to-update').hide();
    jQuery('#back').show();
    jQuery('#lb_Link').html("Atualizar currículo");
    jQuery('#lb_title').html("Alterando cadastro");
    jQuery('#btn-form').removeClass('greenButton redButton').addClass('blueButton'); 
}

function clearFields() {
	jQuery("#fields-candidate").hide();
	jQuery("#type").val("add");
	jQuery('#to-update').show();
    jQuery('#back').hide();
    jQuery('#button-arrow').hide();
    jQuery('#lb-curriculum').show();
    jQuery('#file').show();
    jQuery('#fields-add').show();
    jQuery('#lb_Link').html("Cadastre-se");
    jQuery('#id_name').val("");
    jQuery('#id_surname').val("");
    jQuery('#btn-form').removeClass('blueButton greenButton').addClass('redButton');
    jQuery('#lb_title').html("Ainda não possui cadastro?");
}

function configFormMessage() {
	jQuery('#msg-bdr').hide();
    if (jQuery('#msg_success').html() == 'Operação realizada com sucesso')
        jQuery('#msg_success').fadeOut(5000);
    else 
        jQuery('#msg_success').hide();

    if(jQuery('#msg_success').html() == 'Você já se candidatou para esta vaga'){
        jQuery('#msgs').addClass('warn');
        jQuery('#msgs').html(jQuery('#msg_success').html());
    }
}

function displayForm() {
    if (jQuery('#vacancyId').val() != '') {
        changeFormToCandidate();
    } else { 
        if (jQuery('#type').val() == 'update') {
            showUpdateCurriculum();
        } else {
            showAddCurrilum();
        }
    }
}

function isValidFile(filename){
	var valid_extensions = /(\.doc|\.pdf|\.txt|\.docx)$/i;   
	if(valid_extensions.test(filename)){ 
	   return true;
	} else {
	  return false;
	}
}

function configInputEvents() {

    jQuery('#id_cpf').change(function() {
        validate_mask();
    }); 

    jQuery('#btn_file').click(function() {
        jQuery('#id_curriculum').click();
    });

    jQuery('#id_cpf').focusout(function() {
    	jQuery('#id_cpf').removeClass('required-field');
		if (jQuery('#id_cpf').val() == '' || jQuery('#id_cpf').val() == '___.___.___-__') {
            styleMsgs('info');
            jQuery('#msgs').html("Campo obrigatório: Cpf");
        }else {
        	if(!isValidCPF(jQuery('#id_cpf').val())) {
                styleMsgs('info');
                jQuery('#msgs').html("Cpf inválido");
            }else {
            	styleMsgs('');
                getCandidate();	
            }    
        }
    });

    jQuery('#id_email').focusout(function() {
    	jQuery('#id_email').removeClass('required-field');
		styleMsgs('info');
        if (jQuery('#id_email').val() != '') {
        	if(!isValidMail(jQuery('#id_email').val())) {
                jQuery('#msgs').html("Email inválido");
            }else {
                styleMsgs('');
                getCandidate();
            }
        } else {
            jQuery('#msgs').html("Campo obrigatório: email");
        }
    });

    jQuery('#id_name').focusout(function() {
    	jQuery('#id_name').removeClass('required-field');
		if (jQuery('#id_name').val() == '') { 
            styleMsgs('info');
            jQuery('#msgs').html("Campo obrigatório: nome");
        }else
            styleMsgs('');
    });

    jQuery('#id_surname').focusout(function() {
    	jQuery('#id_surname').removeClass('required-field');
        if (jQuery('#id_surname').val() == '') { 
            styleMsgs('info');
            jQuery('#msgs').html("Campo obrigatório: sobrenome");
        }else
            styleMsgs('');
    });

    jQuery('#id_curriculum').change(function() {
    	jQuery('#id_curriculum').removeClass('required-field');
		if (jQuery('#id_curriculum').val() == '') { 
            styleMsgs('info');
            jQuery('#msgs').html("Campo obrigatório: currículo");
        } else {
        	if(!isValidFile(jQuery('#id_curriculum').val())) {
        		styleMsgs('info');
        		jQuery('#msgs').html("Currículo deve ser: pdf, doc, docx ou txt");
        	}else
        		styleMsgs('');
        }
    });
    

    jQuery('#btn-sou').click(function() {
        showUpdateCurriculum();
    });

    jQuery('#lb_arrow').click(function() {
        if(jQuery('.arrow-down').html() == ''){ 
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
        clearFields();
    });
}

function isValidCPF(strCPF) {
	var regex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    if(regex.test(strCPF)) {
    	strCPF = strCPF.replace(/\./g, '').replace('-', '');
		
		var Soma;
	    var Resto;
	    Soma = 0;
	    if (strCPF === "00000000000") return false;
	     
	    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	    Resto = (Soma * 10) % 11;
	     
	    if ((Resto == 10) || (Resto == 11))  Resto = 0;
	    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
	     
	    Soma = 0;
	    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
	    Resto = (Soma * 10) % 11;
	     
	    if ((Resto == 10) || (Resto == 11))  Resto = 0;
	    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
	    return true;
    }else
    	return false;
}

function isValidMail(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        return false;
    }else
    	return true;
}

jQuery(document).ready( function() {
    init();
});
