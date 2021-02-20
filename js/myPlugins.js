(function($){
    $.fn.scrollTo = function() {
        var top = this.offset().top
        $('html , body').animate({
            scrollTop: top
        });
    };
}(jQuery));