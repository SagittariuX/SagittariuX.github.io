(function($){
    $.fn.csCardAnimation = function(displaceX, duration, easing, complete) {
        return this.each(function() {
            var $elem = $(this);
            $({deg: 0}).animate({deg: displaceX}, {
            duration: duration,
            easing: easing,
            step: function(now) {
              $elem.css({
                 transform: 'translate(' + now + '%, 0%)'
               });
            },
            complete: complete || $.noop
            });
        });
    };
}(jQuery));