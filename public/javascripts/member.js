var flash = new function(){
	
	this.get = function(type){
		return this.cookie[type];
	};
	
	this.show = function(id, type){
		if(this.get(type)){
			$('#'+id).addClass(type).html(this.get(type).replace(/\+/g, ' ')).show();
		}
	};
	
	this.cookie = $.cookies.get('flash') || {};
	$.cookies.del('flash');
	
};