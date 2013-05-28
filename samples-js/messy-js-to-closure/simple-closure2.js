var manager = (function () { 
    var iframe,
		formUrl,
		lib = {},

		init = function () {
			var baseUrl = "http://";
			if (window.location.host === "localhost") {
				baseUrl += "localhost:8000/bdr";
			} else {
				baseUrl += window.location.host+"/bdr/";
			}
			formUrl = baseUrl + "/externo/";
			lib.jQuery = window.jQuery;
		},

		loadjscssfile = function (url) {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", url);
			if (typeof fileref !== "undefined") {
				document.getElementsByTagName("head")[0].appendChild(fileref);
			}
		},

	    addIFrame = function (userId, title) {
			if (!lib.jQuery) {
				throw "Missing jQuery!";
            }
            if (typeof userId !== "undefined" ) {
            	var thisFormUrl = formUrl + userId;
            } else {
            	thisFormUrl = formUrl;
            }
			iframe = lib.jQuery('<div id="my-dialog-content'+userId+'" name="my-dialog-content" style="display: none; background-color: #FFF; width: 410px !important;height:100%;"><iframe id="myFrame" name="myFrame" src="' + thisFormUrl + '" width="410px" height="438px" ></div>');
			iframe.appendTo('body');
		},

		hasIFrameFor = function (userId) {
			return lib.jQuery('#my-dialog-content-'+userId).length > 0;
		},

		addExternalForm = function (userId) {
			if (!iframe || hasIFrameFor(userId) == false) {
				iframe = addIFrame(userId);
				lib.jQuery("#my-dialog-content"+userId).dialog({
					autoOpen: false,
					width: 414,
					height: 370,
					modal: true
				});
			}
		},

		getUserModalId = function (context) {
			try {
				var id = context.parentNode.parentNode.id;
			} catch( ex ) {
				id = "";
			}
			if ( id.indexOf("modal-user") >= 0 ) {
				return id.replace("modal-user", "");
			} else {
				return void 0;
			}  
		},

		showModal = function (userId) {
			addExternalForm(userId);
			var title = "Send your file";
			
			var currentDialog = lib.jQuery('.ui-dialog :visible');
			if ( currentDialog.length > 0 && typeof userId !== "undefined" ) {
				jQuery(".ui-dialog-content").dialog("close");
				title = "&nbsp;";
			}
			
			lib.jQuery("#my-dialog-content"+userId).dialog('option', 'title', title);
			lib.jQuery("#my-dialog-content"+userId).dialog("open").width(365).height(413);
		},

		configureClickButton = function ( element ) {
			var userId = getUserModalId(element);
			var title = "Send your file";
			
			if(typeof userId !== 'undefined'){
				title = " Anothertitle ";
			}
			
			var button =  '<div class="button-margin"><a id="open-my-dialog'+userId+'" class="blueButton buttons site" href="javascript: void 0"> '+title+'</a></div>';
			lib.jQuery(button).appendTo(element);
			lib.jQuery("#open-my-dialog"+userId).click( function() {
				showModal(userId);
			});
		},

		addSendFileButton = function ( context ) {

			loadjscssfile('/media/css/style_button.css');
			if (context.length > 0 ) {
				for ( var i = 0; i < context.length; i ++ ) {
					configureClickButton(context[i]);
				}
			} else {
				configureClickButton(context);
			}

			
		};

	return {
		addButton: function (context) {
			addSendFileButton(context);
		},
		config: function () {
			init();
			
		},
		show: function (userId) {
			showModal(userId);
		}
	};
}());