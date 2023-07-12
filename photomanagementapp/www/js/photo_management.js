// Declare a variable to store image data as a global variable
var capturedImageData = null;

function saveImage() {
  // Check if image data exists
  if (capturedImageData) {
    var params = { data: capturedImageData, prefix: 'beanie_', format: 'JPG', quality: 80, mediaScanner: true };
    window.imageSaver.saveBase64Image(params,
      function (filePath) {
        AndroidToast.showLongToast("The picture has been saved to an album.");
      },
      function (msg) {
        AndroidToast.showLongToast("Failed to save picture.");
      }
    );
  } else {
    AndroidToast.showLongToast("Please take a picture first.");
  }
}

function selectFromGallery() {
    navigator.camera.getPicture(onSuccess2, onFail, {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess2(imageData) {
  capturedImageData = null;
  AndroidToast.showLongToast("Picture choose from gallery.");
}

function takePicture() {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 25,
    destinationType: Camera.DestinationType.DATA_URL,
  });
}

function onSuccess(imageData) {
  var image = document.getElementById("myImage");
  image.src = "data:image/jpeg;base64," + imageData;
  capturedImageData = imageData;
  AndroidToast.showLongToast("Picture taken.");
}

function onFail(message) {
  alert("Failed because: " + message);
}
