<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html>

<head>
    <!-- This is important if I have a heroku sub domain and also have a custom domain poiting to the same heroku hosting 
         and I want to redirect my heroku dub domain to y custom domain -->
    <!-- Its used if the same content is available in more than one URL and specifies that "http://www.getrecyclerview.in/" 
         is the original place of this content. So any other page having this same content redirects to it. -->
    <link rel="canonical" href="http://www.getrecyclerview.in/"> 
    
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Android RecyclerView Native Code Generator</title>
    <meta name="description" content="Generate Android RecyclerView native code">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <!--<link rel="stylesheet" href="./css/bootstrap.min.css">-->
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="shortcut icon" type="image/png" href="./images/favicon.ico"/>
    
 <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-106132847-1', 'auto');
  ga('send', 'pageview');
 </script>
 
</head>

<body>

    <div id='container'>
        <center>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <p class="navbar-left title">Android RecyclerView Code Generator &nbsp; <i></i></p>
                    </div>

                </div>
            </nav>

            <!-- the top title -->
            <ol class="breadcrumb">
                Generate Model/POJO class and Adapter class code along with the RecyclerView implementaion code for your Activity
            </ol>

            <div class='error alert alert-danger fadein' style='display:none'>
                <center>Please Fill Up All The Fields</center>
            </div>


            <!-- input boxes -->

            <div id='input-names-boxes-and-titles'>

                <div class="input-title">Enter your Model Class name</div>
                <input type='text' class='input-names' id='model-class-name' text=''>
                <br>
                <br>

                <div class="input-title">Enter your Adapter Class name</div>
                <input type='text' class='input-names' id='adapter-class-name' text=''>
                <br>
                <br>

                <div class="input-title">Enter RecyclerView Row XML layout name</div>
                <input type='text' class='input-names' id='row-xml-name' text=''>
                <br>
                <br>

                <div class="input-title-long">Enter your RecyclerView Row Layout XML file code <b>(<u>android:id</u> fields required)</b></div>
            </div>

            <!-- Ace editor -->
            <div id="editor-input-code" class='editor-code-input'>
            </div>
            <p>
                <button type="submit" class="btn btn-default" id="submit" name='contact_submit'>SUBMIT</button>
            </p>


            <div class='output-form' style='display:none'>

                <div class='output-title'>Model/POJO Class</div>
                <br>
                <button type="submit" class="btn btn-default hide" id="copy-model" name='copy-model'>Download Class File</button>
                <br>
                <div class="editor-output" id='editor-output-model'>

                </div>

                <br>
                <br>
                <div class='output-title'>Adapter Class</div>
                <br>
                <button type="submit" class="btn btn-default hide" id="copy-adapter" name='copy-adapter'>Download Class File</button>
                <br>
                <div class="editor-output myeditor" id='editor-output-adapter'>

                </div>

                <br>
                <br>
                <div class='output-title'>Initialize and use the RecyclerView like this</div>
                <br>
                <button type="submit" class="btn btn-default hide" id="copy-implementation" name='copy-implementation'>Download Class File</button>
                <br>
                <div class="editor-output myeditor" id='editor-output-implementation'>

                </div>

            </div>
            <br>
            <br>
            <a href="index.php" class="btn btn-default" id='generate-one-more' role="button">START AGAIN</a>




            <!-- load all the JS files in the bottom after the HTML has been loaded -->

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="./js/get-input-generate-output.js"></script>
            <script src="./js/download-output-code.js"></script>
            <script src="./js/internet-check.js"></script>

            <!-- ace editor componets -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.4/ace.js" type="text/javascript" charset="utf-8"></script>
            <script>
                // code input editor
                var editor = ace.edit("editor-input-code");
                editor.setShowPrintMargin(false);
                editor.setTheme("ace/theme/chrome");
                editor.getSession().setMode("ace/mode/xml");
                editor.renderer.setOption('showLineNumbers', false);

                // code output editors
                var editor2 = ace.edit("editor-output-model");
                editor2.setShowPrintMargin(false);
                editor2.setTheme("ace/theme/chrome");
                editor2.getSession().setMode("ace/mode/java");
                editor2.renderer.setOption('showLineNumbers', false);

                var editor3 = ace.edit("editor-output-adapter");
                editor3.setShowPrintMargin(false);
                editor3.setTheme("ace/theme/chrome");
                editor3.getSession().setMode("ace/mode/java");
                editor3.renderer.setOption('showLineNumbers', false);

                var editor4 = ace.edit("editor-output-implementation");
                editor4.setShowPrintMargin(false);
                editor4.setTheme("ace/theme/chrome");
                editor4.getSession().setMode("ace/mode/java");
                editor4.renderer.setOption('showLineNumbers', false);

            </script>
        </center>
    </div>

    <?php 
    include 'footer.php';
    ?>


        <a href="https://github.com/Asutosh11/Android-RecyclerView-code-generator"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Source code on Github" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>

</body>
<html>
