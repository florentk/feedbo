<?php
	$user = $_POST["user"];
	$password = $_POST["password"];
?>


<html>
<head>
	<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
	<script src="ressources/js/tt-rss.js"></script>
	<script src="ressources/js/feed.js"></script>
</head>
<body onload='login("<?=$user?>","<?=$password?>");'>

	<div id="feed">
		<h2>Feed</h2>
		<p id="fresh">Chargement ...</p>
	</div>

	<div id="highlight"><p>Chargement ...</p></div>

</body>
</html>
