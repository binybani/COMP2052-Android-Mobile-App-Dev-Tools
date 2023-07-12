document.addEventListener("deviceready", function () {
  // File Name
  let fileNameTextarea = document.getElementById("fileName");
  let fileName = "";

  // Text for new file
  let writeTextTextarea = document.getElementById("writeText");
  let contents = "";

  // Text from read file
  let readTextTextarea = document.getElementById("readText");

  // Diretory area
  var fileList = document.getElementById("fileList");
  var folderList = document.getElementById("folderList");
  fileList.innerHTML = "";
  folderList.innerHTML = "";

  // Write from File button
  let writeFileButton = document.getElementById("writeFileButton");
  writeFileButton.addEventListener("click", writeFile);

  // Read from File button
  let readFileButton = document.getElementById("readFileButton");
  readFileButton.addEventListener("click", readFile);

  // Show Directory Contents button
  let directoryFileButton = document.getElementById("directoryFileButton");
  directoryFileButton.addEventListener("click", function () {
    clearOutput();
    showFileDirectory();
  });

  // Write file
  function writeFile() {
    fileName = fileNameTextarea.value;
    contents = writeTextTextarea.value;
    window.requestFileSystem(
      LocalFileSystem.PERSISTENT,
      0,
      function (fileSystem) {
        fileSystem.root.getFile(
          fileName,
          {
            create: true,
            exclusive: false,
          },
          function (fileEntry) {
            fileEntry.createWriter(function (writer) {
              writer.onwriteend = function (evt) {
                AndroidToast.showLongToast("Finished writing!");
              };
              writer.write(contents);
            }, fail);
          },
          fail
        );
      },
      fail
    );
  }

  // Read file
  function readFile() {
    fileName = fileNameTextarea.value;
    window.requestFileSystem(
      LocalFileSystem.PERSISTENT,
      0,
      function (fileSystem) {
        fileSystem.root.getFile(
          fileName,
          {},
          function (fileEntry) {
            fileEntry.file(function (file) {
              var reader = new FileReader();
              reader.onloadend = function (evt) {
                readTextTextarea.value = this.result;
                AndroidToast.showLongToast("Finished reading!");
              };
              reader.readAsText(file);
            }, fail);
          },
          fail
        );
      },
      fail
    );
  }

  // Show directory contents
  function showFileDirectory() {
    var directory = cordova.file.dataDirectory;

    window.resolveLocalFileSystemURL(directory, function (dirEntry) {
      var directoryReader = dirEntry.createReader();
      directoryReader.readEntries(function (entries) {
        var parentPath = dirEntry.nativeURL + "files";
        var pathComponents = parentPath.split("/");
        var currentPath = "";
        for (var i = 0; i < pathComponents.length - 3; i++) {
          currentPath += pathComponents[i + 2] + "/";
          var folderName = pathComponents[i + 3];
          folderList.innerHTML +=
            '<p data-path="' + currentPath + '">' + "/" + folderName + "</p>";
        }

        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          var subDirectoryReader = entry.createReader();
          subDirectoryReader.readEntries(function (subEntries) {
            for (var j = 0; j < subEntries.length; j++) {
              var subEntry = subEntries[j];
              let subFileName = subEntry.name;
              fileList.innerHTML += "<p>" + subFileName + "</p>";
            }
          }, fail);
        }
        // folder touch - add it later
        // var folderItems = document.querySelectorAll("#folderList p");
        // folderItems.forEach(function (item) {
        //   item.addEventListener("click", function () {
        //     var folderPath = item.getAttribute("data-path");
        //     navigateToFolder(folderPath);
        //   });
        // }
        // );
      }, fail);
    });
  }

  // Clear old history
  function clearOutput() {
    fileList.innerHTML = "";
    folderList.innerHTML = "";
  }

  // move to touch folder - add it later
  // function navigateToFolder(folderPath) {
  //   window.resolveLocalFileSystemURL(folderPath, function (dirEntry) {
  //     alert("move folder path:", dirEntry.fullPath);
  //   });
  // }

  function fail(error) {
    alert(error.code);
  }
});
