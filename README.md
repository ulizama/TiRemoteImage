# TiRemoteImage

A Titanium component to support remote image loading with full image caching.
Image caching is made using [TiCachedImages][1]

[1]: https://github.com/sukima/TiCachedImages

## Installing

On the project you will find two directories on the `Resources` directory that need
to be added to your own project: `lib` and `components`. Once you have done that
then you can load the component in your project.

    var RemoteImage = require('/components/remoteimage');

On the project you will also find an example showing the basic functionality of
the component. The examples and project have only been tested on iOS, though there
is no reason that it shouldn't work on Android with maybe some minimum styling changes.

## Usage

You start by creating a new ´RemoteImage´ object by passing the properties that
define the image, styling, etc.

    var image = new RemoteImage( params );


### Properties

**All properties must be set at creation.**

- `url` - The full URL of the remote image.
- `hires` - If this property is set to `true` then it will be assumed that the image
url is the high-resolution version. Otherwise, the default, the url will be parsed
to include the @2x suffix. For example, if url is set to *http://mysite.com/image.jpg* and
`hires` is set to `true`, then the url will be kept as is, otherwise it will be converted
to *http://mysite.com/image@2x.jpg*.
- `autoload` - If set to false the image won't be loaded until the `load` method is
called.
- `ondone` - A callback to be called when the image has been loaded. The callback will
be sent a `msg` string with the full details of the cached file.
- `onerror` - A callback to be called if the image has failed loading. The callback will
be sent an `error` string with the error message.

#### Image Styling Properties

- `width` - Default: 320.
- `height` - Default: 190.
- `top` - Default: 0.
- `left` - Default: 0.
- `backgroundColor` - Default: '#fff'.
- `defaultImage` - Default: 'graphics/default_image.png'.

#### Indicator Style Properties
- `indicatorStyle` - Default: Ti.UI.iPhone.ActivityIndicatorStyle.DARK

#### Error Message Style Properties
- `errorMessage` - Default: "Error loading image.\nPlease tap to retry".
- `errorColor` - Default: '#666666'.
- `errorFont` - Default: { fontSize: 12 }.


### Methods

- `image(url)` - Replaces the current image with a new image.
- `load()` - If `autoload` is se to `false`, this method has to be called to load
the image.
- `destroy()` - It's highly recommended that you call this method before disposing
from the object to prevent memory leaks.
- `viewProxy` - Returns the actual view that should be added to other views.


### viewProxy

When you create a new `RemoteImage` an object is returned. This object is a wrapper
around an `ImageView` and it includes all the properties and methods. Therefore the
object SHOULD NOT be added to other views, instead, you have to call the `viewProxy`
method, which will return the actual `ImageView`.

    var image = new RemoteImage({
        url: 'http://mysite.com/image.jpg'
    });

    window.add( image.viewProxy );


## License

MIT
