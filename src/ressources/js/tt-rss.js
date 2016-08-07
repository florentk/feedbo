function tt_rss_query(op,params,cb) {
	const data = JSON.stringify($.extend({"op" : op},params));
	console.log("Query " + data);
	return $.post(
		"http://serveur.kaisser.name/tt-rss/api/",
		data,
		cb,
		"json"
	);
}

function tt_rss_id_query_params(op,sid,ext_params,cb) {
	const params = $.extend({"sid" : sid},ext_params);
	return tt_rss_query (op, params,cb);
}

function tt_rss_id_query(op,sid,cb) {
	return tt_rss_id_query_params (op, sid, {}, cb);
}

function tt_rss_get_headline(sid, feed_id, limit, cb) {
	return tt_rss_id_query_params( "getHeadlines", sid, {"feed_id" : feed_id, "limit" : limit} , cb );
}

function tt_rss_get_categories(sid, cb) {
	return tt_rss_id_query("getCategories", sid, cb);
}

function tt_rss_get_feeds_from_cat_id(sid, cat_id, cb) {
	return tt_rss_id_query_params("getFeeds", sid, {"cat_id" : cat_id} , cb);
}
