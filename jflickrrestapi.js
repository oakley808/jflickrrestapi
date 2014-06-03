/*
 *  Michael Oakley
 *  2014/6/1
 *
 */
(function($) {
    $.fn.jflickrfeed = function(settings, callback) {
        var defaults,
            settings,
            first,
            key,
            url,
            sizes;

        sizes = {
             thumbnail :  '_t'
            ,small     :  '_m'
            ,medium    :  ''
            ,large     :  '_b'
        };

        defaults = {
             flickrbase: 'https://api.flickr.com/services/rest/'
            ,qstrings: {
                 method      : 'flickr.photosets.getPhotos' //  the API to use
                ,lang        : 'en-us'
                ,format      : 'json'
                ,jsoncallback: '?'
                ,per_page: 20
            }
            ,imageSize: '_b'
            ,photoCallback: function(){}
        };

        if( settings.imageSize in sizes){
            settings.imageSize = sizes[ settings.imageSize ]
        }

        // merge our settings
        settings = $.extend(true, defaults, settings);

        url = settings.flickrbase + '?';
        first = true;

        // Build the URL query string
        for( key in settings.qstrings ){
            if(!first) {
                url += '&';
            }
            url += key + '=' + settings.qstrings[key];
            first = false;
        }

        return $(this).each(function(){
            var container,
                $container;

            container  = this;
            $container = $(this);

            $.getJSON(url, function(data){

                $.each(data.photoset.photo, function( i, photo ){
                    var src,
                        alt,
                        img;

                    if(i < settings.qstrings.per_page){

                        src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + settings.imageSize + '.jpg';
                        alt = photo.title
                        img = $('<img />').attr(
                            {
                                 src: src
                                ,alt: alt
                            }
                        );

                        $container.append( img );

                        settings.photoCallback.call( container, photo );
                    }
                });
                if( $.isFunction(callback) ){
                    callback.call( container, data );
                }
            });
        });
    }
})(jQuery);