<?php

$xmlCode = $_POST['xmlCode'];

// remove empty lines
$xmlCode = preg_replace('/^\h*\v+/m', '', $xmlCode);


$modelName = $_POST['modelName'];
$adapterName = $_POST['adapterName'];


// removing ':' in the data given via form as PHP array cannot have a special character in key name in array
$xmlCode = str_replace("android:id","androidID",$xmlCode);

$p = xml_parser_create();
xml_parser_set_option($p, XML_OPTION_CASE_FOLDING, 0);
// parses and stores the data to an array called '$vals'
xml_parse_into_struct($p, $xmlCode, $vals, $index);
xml_parser_free($p);

// define the array to store the 'tag and id' as 'key value pair'
$tag_id_pairs = array();

$count = 1;

for($i = 0; $i < sizeof($vals); $i++){

  // add the 'View (tag) and id' to the array in a loop if both are not null
  if(($vals[$i][tag] != null) && ($vals[$i][attributes][androidID] != null)){

      // For the Views
      $tag_id_pairs[View][$count] = $vals[$i][tag];
      // for the ids
      $tag_id_pairs[id][$count] = $vals[$i][attributes][androidID];
      
      $count++;
      
  }

}

// encode the array and make it a JSON so that its easier to get the data in JS file by parsing it
echo json_encode($tag_id_pairs);

 ?>
