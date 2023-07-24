<?php
	include 'config.php';

	if ((strlen($key) < 12) or ($key <> $_GET["key"])){
		$user = $_POST["user"];
		$password = $_POST["password"];
	}

	$t = time();
?>


<html>
<head>
	<meta http-equiv="Cache-control" content="no-cache">
	<script src="ressources/js/jquery.js"></script>
	<script src="ressources/js/functionnal.js?t=<?=$t?>"></script>
	<script src="ressources/js/tt-rss.js?t=<?=$t?>"></script>
	<script src="ressources/js/format_entry.js?t=<?=$t?>"></script>	
	<script src="ressources/js/feed.js?t=<?=$t?>"></script>
	<link rel="stylesheet" href="ressources/css/main.css">
</head>
<body onload='onload("<?=$user?>","<?=$password?>");'>
	<ul id="main">
		<li id="highlight"><p>Chargement ...</p></li>
		<li id="feed">
				<h2>Feeds</h2>
				<div id="fresh"><p>Chargement ...</p></div>
				<a id="more" href=""> More items </a>
		</li>
	</ul>
</body>
</html>
