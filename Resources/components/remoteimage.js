// TiRemoteImage - A Titanium component to support remote image loading with full image caching.
//
// For full usage examples and documentation:
// https://github.com/ulizama/TiRemoteImage
//
// Author: Uriel Lizama <uriel@baboonmedia.com>
// http://ulizama.com/


var _ = require('/lib/underscore'),
  Component = require('/lib/component'),
	FileLoader = require('/lib/file_loader');

function RemoteImage( params ) {

	params = _.extend({
		autoload: true,
		ondone: function(e){ },
		onerror: function(e){ },
		hires: false,

		//Image defaults
		width: 320,
		height: 190,
		top: 0,
		left: 0,
		backgroundColor: '#fff',
		defaultImage: 'graphics/default_image.png',

		//Indicator styling
		indicatorStyle: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,

		//Unable to load message
		errorMessage: "Error loading image.\nPlease tap to retry",
		errorColor: '#666666',
		errorFont: { fontSize: 12 }
	}, params);


	//Component wrapper
	var myImage = new Component( Ti.UI.createView({
		width:params.width,
		height:params.height,
		top:params.top,
		left:params.left,
		backgroundColor:params.backgroundColor
	}));
	myImage._hasError = false;

	//Actual image holder
	myImage._image = Ti.UI.createImageView({
		width:params.width,
		height:params.height,
		top:0,
		left:0,
		opacity:0,
		hires:true,
		defaultImage:params.defaultImage
	});
	myImage.add(myImage._image);

	//Activity indicator
	myImage._activityIndicator = Ti.UI.createActivityIndicator({
	  style:params.indicatorStyle,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	myImage.add( myImage._activityIndicator );


	//Error button & reload
	myImage._retry = function(){
		if( myImage._hasError ){
			myImage._hasError = false;
			myImage.remove(myImage._errorButton);
			myImage.load();
		}
	};

	myImage._errorButton = Ti.UI.createButton({
		width:params.width,
		height:params.height,
		top:0,
		left:0,
		backgroundColor:'transparent',
		style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
	});

	myImage._errorLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		text:params.errorMessage,
		color:params.errorColor,
		font:params.errorFont
	});
	myImage._errorButton.add(myImage._errorLabel);

	myImage._errorButton.addEventListener('click',myImage._retry);

	//Private Methods
	myImage._error = function( error ){
		myImage._activityIndicator.hide();

		if( !myImage._hasError ){
			myImage._hasError = true;
			myImage.add(myImage._errorButton);
		}

		//If we have an onerror callback, call it
		if( _.isFunction( params.onerror ) ){
			params.onerror(error);
		}
	};

	myImage._display = function( file ){
		myImage._activityIndicator.hide();

		if( _.isObject(file) ){
			myImage._image.image = file.getFile();
			myImage._image.opacity = 1;

			//If we have an ondone callback, call it
			if( _.isFunction( params.ondone ) ){
				params.ondone( file.toString() );
			}

		}
		else{
			myImage._error('Unable to find image');
		}
	};

	//Public methods
	myImage.destroy = function(){
		myImage._errorButton.removeEventListener('click',myImage._retry);
	};

	myImage.load = function(){

		if( !_.has(params,'url') || !_.isString(params.url) || params.url == '' ){
			return myImage._error('No image URL provided');
		}

		myImage._activityIndicator.show();

		var url = getImageURL( params.url, params.hires );

		FileLoader.download( url )
    .then(myImage._display)
    .fail(myImage._error)
    .done();

	};

	//Public image method to change the image location
	myImage.image = function( url ){
		myImage._image.image = params.defaultImage;
		params.url = url;
		myImage.load();
	}

	if( params.autoload ){
		//If we are to autoload the image, call the load function
		myImage.load();
	}

	return myImage;

};


function getImageURL( url, hires ){

	//If the image is not set to be hires, then it parses the image url
	//to include @2x suffix to load the hires versions, otherwise returns
	//the url as is
	if( hires ){
		return url;
	}

	var image = url;
  var basename = image.replace(/\\/g,'/').replace( /.*\//, '' );
  var segment = basename.split('.');

  // replace with hires filename
  return image.replace(basename, segment[0]+'@2x.'+segment[1]);

}

module.exports = RemoteImage;