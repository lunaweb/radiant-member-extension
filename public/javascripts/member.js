var flash = new function(){
	
	this.get = function(type){
		return this.cookie[type];
	};
	
	this.show = function(id, type){
		if(this.get(type)){
			$('#'+id).addClass(type).html(this.get(type).replace(/\+/g, ' ')).show();
		}
	};
	
	this.cookie = {};
	
	// récupération du cookie
	var separated = document.cookie.split( ';' );
	for(var i=0; i<separated.length; i++){
		pair = separated[i].split('=');
		name = pair[0].replace( /^\s*/, '' ).replace( /\s*$/, '' );
		
		if(name == 'flash'){
			try{
				value = decodeURIComponent(pair[1]);
				eval('var value = '+value+';');
			}
			catch(e){
				value = pair[1];
			}
			this.cookie = value;
		}
	}
	
	// suppression du cookie flash
	var date = new Date();
	date.setTime(date.getTime() - (3600 * 1000));
	document.cookie = 'flash=; expires=' + date.toGMTString();
};