$(document).ready(function(){
    

$("#submit").click(function(){
var editor = ace.edit("editor-input-code");
var xmlCodeEntered = editor.getValue();

// remove empty lines
// imp - 1
xmlCodeEntered = xmlCodeEntered.split("\n").map($.trim).filter(function(line) { return line != "" }).join("\n");


var modelNameEntered = $("#model-class-name").val();
var adapterNameEntered = $("#adapter-class-name").val();
var rowXMLNameEntered = $("#row-xml-name").val();
    
modelNameEntered = modelNameEntered.replace(".java", "");
adapterNameEntered = adapterNameEntered.replace(".java", "");
rowXMLNameEntered = rowXMLNameEntered.replace(".xml", "");
    
modelNameEntered = modelNameEntered.replace(".Java", "");
adapterNameEntered = adapterNameEntered.replace(".Java", "");
rowXMLNameEntered = rowXMLNameEntered.replace(".Xml", "");
    
modelNameEntered = modelNameEntered.replace(".JAVA", "");
adapterNameEntered = adapterNameEntered.replace(".JAVA", "");
rowXMLNameEntered = rowXMLNameEntered.replace(".XML", "");

// making global variables so that we can use it in other JS files
window.modelNameEntered = modelNameEntered;
window.adapterNameEntered = adapterNameEntered;
window.rowXMLNameEntered = rowXMLNameEntered;

var dataString = 'xmlCode='+xmlCodeEntered+'&modelName='+modelNameEntered+"&adapterName="+adapterNameEntered;

// alert(modelNameEntered + " " + adapterNameEntered);

// check and show 'Android Toast like error' for empty String or String with just white spaces
if( (xmlCodeEntered=='') || (/^\s+$/.test(xmlCodeEntered)) || 
    (modelNameEntered=='') || (/^\s+$/.test(modelNameEntered)) || 
    (adapterNameEntered=='') || (/^\s+$/.test(adapterNameEntered)) ||
    (rowXMLNameEntered=='') || (/^\s+$/.test(rowXMLNameEntered))
  )
{
$('body').scrollTop(0);     
$('.error').fadeIn(400).delay(3000).fadeOut(400);
}

else
{
// AJAX Code To Submit Form data to 'process.php'
$.ajax({
type: "POST",
url: "./process.php",
data: dataString,
cache: false,

success: function(result){

// when getting the result from the PHP script, hide the TextArea and change the text in the breadcrumb and display the generated code
$('#submit').hide();
$('#editor-input-code').hide();
$("#input-names-boxes-and-titles").hide();
$(".breadcrumb").text("Your code is here");
$('.output-form').show();

    
    
// The PHP script that we are getting the result from is sending a Json encoded array
// That thing here in Javascript variable 'result' is a JSON object and inside which are 2 JSON objects - 
// View and id
    
    
// JSON parsing for the JSON we are getting from PHP script
var json = JSON.parse(result);
    
    var Views = [];
    var ids = [];

for(var key in json) {
 if(json.hasOwnProperty(key)) {
   if(key === 'View') {
     for(var innerKey in json[key]) {
       if(json[key].hasOwnProperty(innerKey)) {
           
           Views.push(json[key][innerKey]);
          // alert(Views);
       }
     }
   }
    else if(key === 'id'){
      for(var innerKey in json[key]) {
       if(json[key].hasOwnProperty(innerKey)) {
           
           json[key][innerKey] = json[key][innerKey].replace('@','');
           json[key][innerKey] = json[key][innerKey].replace('+','');
           json[key][innerKey] = json[key][innerKey].replace('id/','');
           ids.push(json[key][innerKey]);
           // alert(ids);
       }
     }   
   }
 }
}
    
if(ids[0] == null){
    $('#submit').show();
    $('#editor-input-code').show();
    $("#input-names-boxes-and-titles").show();
    $(".breadcrumb").text("This tool generates Model class and Adapter class code along with the RecyclerView implementaion code");
    $('.output-form').hide();
    $('.error').fadeIn(400).delay(3000).fadeOut(400).text("May be you forgot to give 'android:id' in your Views.  Try again!");
}
    


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//generate the output codes here
    
    
//********************************************************************************************************************
//1. the Model class first
    
var editor = ace.edit("editor-output-model");
    editor.session.setOptions({
    mode: "ace/mode/java",
    tabSize: 8,
    useSoftTabs: true
});
// Clear the editor first before composing code and setting on it    
editor.setValue("");     
  
// code for Class start  
var temp = "public class "+capitalizeFirstLetter(window.modelNameEntered)+" {\n\n"+    
            " public String";
editor.insert(temp);
    
// code to declare variables along with the 'public String' 3 lines above
for (var i = 0; i < ids.length; i++){
    var temp = ids[i];
    editor.insert(temp);
    if((i+1) != ids.length){
        editor.insert(",");
    }
}
    
    editor.insert(";");
    editor.insert("\n");
    editor.insert("\n");
    
// code to define setter and getter methods    
for (var i = 0; i < ids.length; i++){
    
    // every id has an extra space now, i don't know why
    // but delete those extra space
    ids[i] = ids[i].replace(" ", "");
    
    editor.insert("public String get"+capitalizeFirstLetter(ids[i])+"() {");
    var temp = "\n";
    editor.insert(temp);
    editor.insert("return "+ids[i]+";");
    editor.insert(temp);
    editor.insert(" }");
    editor.insert(temp);   
    editor.insert("public void set"+capitalizeFirstLetter(ids[i])+"(String "+ids[i]+") {");
    editor.insert(temp);
    editor.insert("this."+ids[i]+" = "+ids[i]+";");
    editor.insert(temp);
    editor.insert(" }");
    
    editor.insert(temp);
    editor.insert(temp);
    

    
        
   }
    editor.insert("}");
    editor.scrollToLine(1, true, true, function () {});
    
    
    
//********************************************************************************************************************
//2. the Adapter class second
    
var editor2 = ace.edit("editor-output-adapter");
    editor2.session.setOptions({
    mode: "ace/mode/java",
    tabSize: 8,
    useSoftTabs: true
});
// Clear the editor first before composing code and setting on it    
editor2.setValue(""); 
    
  
    
    
jQuery.get('./files/adapter.txt', function(data) {
    
          
    editor2.insert(data);
    
    editor2.find('TagAdapter');
    editor2.replaceAll(capitalizeFirstLetter(window.adapterNameEntered));
    
    editor2.find('TagsModel');
    editor2.replaceAll(capitalizeFirstLetter(window.modelNameEntered));
    
        
    // Views declaration part inside 'public static class Viewholder extends RecyclerView.ViewHolder'
    editor2.find("public TextView tagText;");
    var temp3 = "";
    for(var j = 0; j<Views.length; j++){
               
        if(j == 0){
           temp3 = temp3 + "public " + Views[j] + " " + ids[j] + ";" + "\n";
        } 
        else{
            // add extra spacing for 2nd row onwards for Views definition as they don't get indented in ace editor
            temp3 = temp3 + "        public " + Views[j] + " " + ids[j] + ";" + "\n";
        }
    }
    editor2.replace(temp3);
    
    
    // Views definitiom part inside 'public static class Viewholder extends RecyclerView.ViewHolder'
    editor2.find("tagText = (TextView)itemView.findViewById(R.id.tag_text);");
    var temp4 = "";
    for(var k = 0; k<Views.length; k++){
               
        if(k == 0){
           temp4 = temp4 + ids[k] + " = " + "(" + Views[k] + ")" + "itemView.findViewById(R.id." + ids[k] + ")" + ";" + "\n";
        } 
        else{
            // add extra spacing for 2nd row onwards for Views declaration as they don't get indented in ace editor
            temp4 = temp4 + "            " + ids[k] + " = " + "(" + Views[k] + ")" + "itemView.findViewById(R.id." + ids[k] + ")" + ";" + "\n";
        }
    }
    editor2.replace(temp4);
    
    
    // Replace the XML row layout name in the adapter
    editor2.find("R.layout.tags_row");
    var temp10 = "R.layout."+window.rowXMLNameEntered;
    editor2.replace(temp10);
    
    
    editor2.setValue(editor2.getValue(), 1);
    editor2.scrollToLine(1, true, true, function () {});
    
});
    
    
    
//********************************************************************************************************************
//3. the implementation codes third
    
var editor3 = ace.edit("editor-output-implementation");
    editor3.session.setOptions({
    mode: "ace/mode/java",
    tabSize: 8,
    useSoftTabs: true
});
// Clear the editor first before composing code and setting on it    
editor3.setValue("");
    
    jQuery.get('./files/implementation.txt', function(data) {    
          
    editor3.insert(data);
        
    editor3.find("YourModelName");
    editor3.replaceAll(capitalizeFirstLetter(window.modelNameEntered));
    editor3.find("YourAdapterName");
    editor3.replaceAll(capitalizeFirstLetter(window.adapterNameEntered));
        
    editor3.find("model.<SetterMethod>();");
    var temp5 = "";
    for(var l = 0; l < ids.length; l++){
        if(l == 0){
            temp5 = temp5 + 'model.set'+capitalizeFirstLetter(ids[l])+'("some dummy data");'+"\n";
        }
        else{
            temp5 = temp5 + '   model.set'+capitalizeFirstLetter(ids[l])+'("some dummy data");'+"\n";
        }
    } 
    editor3.replace(temp5);
        
    editor3.setValue(editor3.getValue(), 1);
    editor3.scrollToLine(1, true, true, function () {});
    
    
});
    
   
}    
    
    
    
    
    




});
}
return false;
});
});





// useful functions defined
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
