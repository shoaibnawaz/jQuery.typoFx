;(function($){
    var config = {};
    var registeredFx = {};
    $.extend({
        typoFx: {
            registerFx : function(fx){
                registeredFx[fx.name] = fx.fx;
                config[fx.name] = fx.config;
            },

            unregisterFx : function(name){
                delete registeredFx[name];
                delete config[name];
            },

            config : function(_conf){
                if ( typeof(_conf) == 'undefined' )
                    return config;
                else
                    config = _conf;
            }
        }
    });

    $.fn.typoFx = function( _fxname, _config ){
        if ( typeof(_config) != 'undefined' && $.isPlainObject(_config) ){
                $.extend(true, config, _config );  
        }
        $(this).each(function(){
            var texts = [];
            $(this).each(function(i){
                texts.push(this);
                (registeredFx[_fxname])(this);
            });
        });

        return this;
    };
})(jQuery);

jQuery.typoFx.registerFx({ 
    name: 'concentrate', 
    config: { speed: 1000, delay: 500 }, 
    fx: function( textNode ){
        var name = "concentrate";
        var config = jQuery.typoFx.config();
        var fxconfig = config[name];
        var $tn = $(textNode);
        var $wrap = $('<div>');
        $wrap.append( $tn.text( ).replace( /([\S])/g,'<span>$1</span>' ) );
        $wrap.css('position','relative');
        $tn.html($wrap).css({position: 'absolute' });
        $('span',$tn).stop().css({position:'relative',
            opacity:0,
            fontSize:84,
            top:function(i){return Math.floor(Math.random()*500)*((i%2)?1:-1);},
            left:function(i){return Math.floor(Math.random()*500)*((i%2)?1:-1);}
        }).animate( {opacity:1,fontSize:12,top:0,left:0},fxconfig.speed );
    }
});

jQuery.typoFx.registerFx({ 
    name: 'burst', 
    config: { speed: 350, delay: 100, topOffset: -35, leftOffset: 5, fontSize: 84 ,opacity: 0}, 
    fx: function( textNode ){
        var name = "burst";
        var config = jQuery.typoFx.config();
        var fxconfig = config[name];
        var positions = [];   
        var $tn = $(textNode);
        $tn.html( $tn.text( ).replace( /([\S])/g,'<span>$1</span>' ) );
        $tn.css('position','relative');
        $('span',$tn).each(function(i){
            positions[i] = $(this).position();
        }).each(function(i){
            var initialEffects = {
                position:'absolute',
                top: function(){ return positions[i].top + fxconfig.topOffset ; },
                left: function(){ return positions[i].left + fxconfig.leftOffset ; }
            };
            $.extend(true, initialEffects, fxconfig);
            $(this).stop().css(initialEffects).delay(i*fxconfig.delay).
                animate( {opacity:1,fontSize:12,top:positions[i].top,left:positions[i].left},fxconfig.speed );
        });
    }
});

jQuery.typoFx.registerFx({
    name: 'encounter',
    config: {
        yOffset: 50,
        speed: 500,
        delay: 50,
        opacity: 0,
        fontSize: 84
    },
    fx: function(textNode){
        var name = "encounter";
        var config = jQuery.typoFx.config();
        var fxconfig = config[name];
        var $tn = $(textNode);
        var positions = [];
        var initialEffects = {};
        $tn.html( $tn.text( ).replace( /([\S])/g,'<span>$1</span>' ) );
        $('span',$tn).each(function(i){
            positions[i] = $(this).position();
            if( i%2 )
                $(this).css({top: -1 * fxconfig.yOffset, left: positions[i].left});
            else
                $(this).css({top: fxconfig.yOffset, left: positions[i].left});
            initialEffects.position = 'absolute';
            $.extend(true, initialEffects, fxconfig);            
        }).each(function(i){
            $(this).stop().css(initialEffects).delay(i*fxconfig.delay).
                animate( {opacity:1,fontSize:12,top:positions[i].top,left:positions[i].left},{ 
                    speed: fxconfig.speed,
                    step: function(now, fx){
                        //console.debug(fx.prop);
                    }
                });
        });

    }
});
