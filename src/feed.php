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
	<script src="ressources/js/feed.js?t=<?=$t?>"></script>
</head>
<body onload='login("<?=$user?>","<?=$password?>");'>

	<div id="feed">
		<h2>Feed</h2>
		<p id="fresh">Chargement ...</p>
	</div>

	<div id="highlight"><p>Chargement ...</p></div>

</body>
</html>
