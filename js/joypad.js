

(function($){
	
	$.fn.joypad = function( settings ){
		
		
		return this.each(function(){
			var elem = $(this),
				keys = [ "cross-key", "button" ],
				elems = {};
				
			for( i = 0; i < keys.length; i++ ){
				key = keys[i];
				keyElem = elem.find("."+key).each(function(){
					var keyElem = $(this),
					    w = keyElem.width(),
						h = keyElem.height(),
	                   pos = keyElem.position() ||{},
	                   top = pos.top,
	                   left = pos.left,
	                   centerX = left + (w/2),
	                   centerY = top + (h/2);
	                
					if(!elems[key]) elems[key]={};
	                elems[key][this.id] = {
	                    width : w,
	                    height : h,
	                    top : top,
	                    left : left,
						bottom: top + h,
						right: left+w,
	                    centerX : centerX,
	                    centerY : centerY
	                };
				});
			}
			
			
            $(document).bind("touchstart touchmove touchend", function( e ){
				var touches = e.originalEvent.touches,
				    length = touches.length,
					t,
					i, 
					x, 
					y, 
					angle, 
					range,
					event = {},
					pageX,
					pageY,
					ck = elems["cross-key"]["cross-key"],
					buttons = elems.button,
					bl = buttons.length,
					button;
				
				for(i=0;i<length;i++){
					t = touches[i];
                    if( !t || !t.pageX ) continue;
					pageX = t.pageX;
					pageY = t.pageY;
					
					
					
					//cross-key
					if( pageX >= ck.left && 
					  pageX <= ck.right && 
					  pageY >= ck.top && 
					  pageY <= ck.bottom){
					    x = Math.round( ( pageX - ck.centerX ) / ( ck.width /2 ) * 100 );
                        y = Math.round( ( pageY - ck.centerY ) / ( ck.height / 2 ) * -100 );
                
						angle = (Math.atan2( y, x )/Math.PI)*180;
						angle = Math.floor( ( ( ( angle < 0 ) ? angle + 360 : angle ) + 22.5 ) / 45  );
						
						range = Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
						range = Math.round( ( range > 100) ? 100 : range );
						
						event.ck = {
                            x : x,
                            y : y,
                            ang : ( angle == 8 ) ? 0 : angle ,
							ran : range
						};
						
    				}
					
					//buttons
					for( id in buttons ){
						button = buttons[id];
						
                        if (pageX >= button.left && 
						  pageX <= button.right &&
						  pageY >= button.top &&
						  pageY <= button.bottom) {
						  	event[id] = true;
						}
						
					}					
					
				}
				event.type=e.type;
				elem.trigger("joypad", event );
				
                e.preventDefault();
			});
			
			
			
		});
	};
	
})(jQuery);
