<?php
	$user = $_POST["user"];
	$password = $_POST["password"];
	$t = time();
?>


<html>
<head>
	<meta http-equiv="Cache-control" content="no-cache">
	<script src="ressources/js/jquery.js"></script>
	<script src="ressources/js/tt-rss.js?t=<?=$t?>"></script>
	<script src="ressources/js/format_entry.js?t=<?=$t?>"></script>	
	<script src="ressources/js/feed.js?t=<?=$t?>"></script>
	<link rel="stylesheet" href="ressources/css/main.css">
</head>
<body onload='login("<?=$user?>","<?=$password?>");'>
	<ul id="main">
		<li id="highlight"><p>Chargement ...</p></li>
		<li id="feed">
			<ul>
				<h2>Feeds</h2>
				<div id="fresh"><p>Chargement ...</p></li>
			</ul>
		</li>
	</ul>
</body>
</html>
