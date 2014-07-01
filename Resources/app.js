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

//Image will be auto loaded
var autoLoadImage = new RemoteImage({
    url: 'https://wiki.appcelerator.org/download/attachments/360450/titans?version=5&modificationDate=1299710719000',
    onerror: imageError,
    ondone: imageSuccess,
    hires: true,
    width: 150,
    height: 150,
    top:20
});
window.add(autoLoadImage.viewProxy);

var changeButton = Ti.UI.createButton({
   width:Ti.UI.SIZE,
   height:Ti.UI.SIZE,
   title:'Change Image',
   top:20,
   left:180
});
changeButton.addEventListener('click', function(e){
    autoLoadImage.image('http://www.appcelerator.com/wp-content/uploads/titanium_bigblue.png');
});
window.add(changeButton);

//Image will be loaded until requested
var loadOnRequest = new RemoteImage({
    url: 'http://docs.appcelerator.com/images/titanium-device-graphic.png',
    onerror: imageError,
    ondone: imageSuccess,
    autoload: false,
    hires: true,
    width:150,
    height:150,
    top:200,
    left:20,
    backgroundColor:'yellow'
});
window.add(loadOnRequest.viewProxy);

var loadButton = Ti.UI.createButton({
   width:Ti.UI.SIZE,
   height:Ti.UI.SIZE,
   title:'Load Image',
   top:200,
   left:180
});
loadButton.addEventListener('click', function(e){
    loadOnRequest.load();
});
window.add(loadButton);

window.open();
