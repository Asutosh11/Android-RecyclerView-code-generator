/*
This JS file is for
the 'Download Class File' option for the 3 types of output code.

IMP: Don't have this feature enabled now on the app. But if you were to make a feature like that, I have made some basic structure here.
     Make changes as per your need.
*/

// for download file options

$('#copy-model').click(function (event) {

         var editor = ace.edit("editor-output-model");
         var data = editor.getValue();

         var textToSave = data;
         var hiddenElement = document.createElement('a');
         hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
         hiddenElement.target = '_blank';
         hiddenElement.download = window.modelNameEntered+".java";
         hiddenElement.click();

});


$('#copy-adapter').click(function (event) {

  var editor = ace.edit("editor-output-adapter");
  var data = editor.getValue();

  var textToSave = data;
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = window.adapterNameEntered+".java";
  hiddenElement.click();

    });


$('#copy-implementation').click(function (event) {

  var editor = ace.edit("editor-output-implementation");
  var data = editor.getValue();

  var textToSave = data;
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'myActivity.java';
  hiddenElement.click();

    });
