jflickrrestapi
==============

A jQuery plugin to pull photos from the Flickr REST API


## Sample Usage

```html
<div class="photo-viewer"></div>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="jflickrrestapi.js"></script>
<script>
$(document).ready( function(){
    $('.photo-viewer').jflickrrestapi(
        {
             imageSize: 'medium'
            ,qstrings: {
                 api_key: {YOUR_API_KEY}
                ,photoset_id: 12345 // the photoset you want to pull
            }
        }
    );
});
</script>

```
You need an API key from Flickr. You can get that here https://www.flickr.com/services/apps/create/apply
