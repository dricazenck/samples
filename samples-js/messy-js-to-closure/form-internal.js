$(document).ready(function() {
	init();
	configButtons();	
});

var configButtons = function() {
	$('.save').click(function() {
		clearMsgs();
		if ( validate_form() ) {
			if ( $("#type").val() === 'update' ) {
				submitForm();
			} else {
				checkExistCandidate(submitForm);
			}
		}
	});
}

var submitForm = function() {
	$('#id_cpf').val( removerMaskCpf($('#id_cpf').val()) );
	$("#form").submit();
}

var init = function() {
	if ( $("#type").val() === 'new' ) {
		$('#id_rating_0').attr('checked', true);
	} 
}

var clearMsgs = function() {
	$('#msgs').html("");
	$('#msgs').hide();
}

var verify_all_required =  function( style_msg ) {
	var errors = 0;
	if( !verify_required( $("#id_name")) )
		errors++;
	if( !verify_required( $("#id_surname")) )
		errors++;
	if( $("#type").val() === 'new' && !verify_required( $("#id_curriculum")) )
		errors++;
	if( !verify_required($("#id_cpf")) )
		errors++;
	if( !verify_required($("#id_email")) )
		errors++;
	if( !verify_required($("#id_city")) )
		errors++;
	
	if(errors > 0){
		changedMsgs(style_msg, "Preencha os campos obrigatórios", false);
		return false;
	}else
		return true;
}

var verify_required = function (element) {
	if(element.val() === 'undefined' || element.val().length == 0) {
		element.addClass('required-field');
		return false;
	}else {
		element.removeClass('required-field');
		return true;
	}
}

var verify_email = function( style_msg ) {
	if( verify_required($('#id_email')) ){
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if( regex.test($('#id_email').val()) == false ) {
	    	changedMsgs(style_msg, "Endereço de e-mail inválido", true);
	    	return false;
	    }
	    return true;
	}
}

var verify_cpf = function ( style_msg ) {
	var error_email_message = "CPF inválido.";
	if( verify_required($("#id_cpf")) ){
    	if( !isValidCPF($("#id_cpf").val()) ){
    		changedMsgs(style_msg, error_email_message, true);
    		return false;
    	}else  
    	    return true;
	}
}

var validate_form = function(){
	var error = 0;
	if ( !verify_all_required("msg-error") )
		error++;
	if ( !verify_email("msg-error") )
		error++;
	if ( !verify_cpf("msg-error") )
		error++;
	
	if( error > 0 )
		return false;
	else
		return true;
}

var validate_upload_form = function ( submit_button ){
	var parent = submit_button.parentNode;
	var childArray = parent.childNodes;
	for(var i = 0; i < childArray.length; i++) {
		if(childArray[i].id == 'id_genericfile') {
			return verify_required(childArray[i]); 
		}
	}
	return false;
}

var validade_cadidate_url = function() {
	var input_type    = document.getElementById('id_urlType');
	var input_address = document.getElementById('id_address');
	var result = true;
	
	result = input_type.value != "";
	result =  result && verify_url(input_address);
	
	if( result == false ) {
		alert('Preencha corretamente os campos.');
	}
	
	return result;
}

var removerMaskCpf = function( strCpf ) {
	return strCpf.replace(/\./g, '').replace('-', '');
}

var isValidCPF = function( strCPF ) {
	var error = 0;
	strCPF = removerMaskCpf( strCPF );
	
	var Soma;
    var Resto;
    Soma = 0;
    if (strCPF === "00000000000") return false;
     
    for(i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
     
    if((Resto == 10) || (Resto == 11))  Resto = 0;
    if( Resto != parseInt(strCPF.substring(9, 10)) ) return false;
     
    Soma = 0;
    for( i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
     
    if( (Resto == 10) || (Resto == 11))  Resto = 0;
    if( Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    
    return true;
}

var changedMsgs = function ( style, msg, add ) {
	$('#msgs').show();
	if( !add ){
	    $('#msgs').html("<div class='"+style+"'>"+msg+"</div");
	}else{
		var newMsg = "<div class='"+style+"'>"+msg+"</div";
		$('#msgs').html($('#msgs').html()+newMsg);
	}
}

var checkExistCandidate = function ( submitForm ){
	var cpf = $('#id_cpf').val().replace(/\./g, '').replace('-', '');
    var url = ['http://', window.location.host, '/get/',$('#id_email').val(),'/',cpf,'/'].join('');
    
    if ( verify_cpf("msg-error") && verify_email("msg-error") ){
    	$.ajax({
			type : "GET",
			url : url,
			dataType : "json",
			success : function(data) {
				if (typeof data["surname"] !== "undefined") { 
	            	changedMsgs('msg-warn', "Candidato já existe e não pode ser cadastrado novamente.", true);
	            } else {
	            	submitForm();
	            }
			}
		});
    } 
}

var verify_url = function( element ){
	var error_url_message = "URL inválida.";
	var urlregex = new RegExp("((https?|http):((//)|(\\\\))+[\w\d:#@%/;$()~_?\+-=\\\.&]*)");
	
	if( $(element).val().trim().length > 0 && urlregex.test($(element).val()) == false ){
		put_tooltip(element, error_url_message);
		return false;
	}
	$(element).removeClass('error');
	return true;
}

var put_tooltip = function( element , message ) {
	$(element).addClass('error');
	$(element).qtip({
	   content: message,
	   show: {
		   fixed: true
	   },
	   hide: {
		   fixed: true // Make it fixed so it can be hovered over
	   },
	   position: {
		   corner: {
			   target: 'topRight',
			   tooltip: 'bottomLeft'
		   }
	   },
	   style: { 
		   border: {
			   width: 2,
			   radius: 10
		   },
		   name: 'red' // Inherit from preset style
	   }
	})
}