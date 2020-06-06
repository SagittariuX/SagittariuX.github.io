var galleryHandler = new Hammer($('#artGallery'));

galleryHandler.on('panleft panright', function(event){
    console.log(event.type);
});