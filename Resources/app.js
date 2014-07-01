var RemoteImage = require('/components/remoteimage');


var window = Titanium.UI.createWindow({
    backgroundColor:'#fff'
});

var imageError = function(error){
  Ti.API.info('RemoteImage Error -> ' + error);
};

var imageSuccess = function( msg ){
    Ti.API.info('RemoteImage Success -> ' + msg);
};

var image = new RemoteImage({
    autoload: true,
    onerror: imageError,
    ondone: imageSuccess,
    hires: true,
    width: 300,
    height: 300,
    //url: 'https://wiki.appcelerator.org/download/attachments/360450/titans?version=5&modificationDate=1299710719000'
});

window.add(image.viewProxy);

window.open();
