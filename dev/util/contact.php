<?php 

if(isset($_POST['sName']) && isset($_POST['sAddress']))
{

	// parse form data
	$senderName = $_POST['sName'];
	$senderAddress = $_POST['sAddress'];

	$fSubject = $_POST['subject'];
	$fBody = $_POST['body'];

	// synthesize subject
	$subject = "[JHBR CR] ".$fSubject; 

	// JHBR variables
	$jhbr_head = "From: ".$senderName." <".$senderAddress."> \n";
	$jhbr_head.= "Reply-to: ".$senderAddress;

	// $jhbr_to = "contact@jhbr.us";
	$jhbr_to = "judy@jhbr.us";

	$jhbr_body = "Contact Request from ".$senderName."\n";
	$jhbr_body.= "===================="."\n\n";
	$jhbr_body.= $fBody;

	// Send message to JHBR
	mail($jhbr_to,$subject,$jhbr_body,$jhbr_head);

	$url = str_replace( $_SERVER['QUERY_STRING'], '', $_SERVER['HTTP_REFERER'] );

	header('Location: ' . $url . "?submitted=1");
}

?>