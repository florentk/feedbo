const UPDATE_INTERVAL = 30000;
const NB_HIGHLIGHT_ENTRY = 10;
const NB_FRESH_ENTRY = 40;

function auto_update (f) {
	f.call();
	setInterval(f, UPDATE_INTERVAL);
}

function write_entries (id, show_source) {
	return function ( data ) {
		const entries = data.content;
		const html_entries = entries.map(entry_to_html(show_source));
		const d = new Date();
		$("div#" + id).html(html_entries.join("\n") + "<small>"+d.toString()+"</small>\n");
	}
}

function load_highlight_feeds(sid,feed_id,div_id) {
	return function () {
		tt_rss_get_headline (sid, feed_id, NB_HIGHLIGHT_ENTRY, write_entries(div_id, false));
	}
}

function load_fresh_feeds (sid) {
	return function () {
		tt_rss_get_headline (sid, -3, NB_FRESH_ENTRY, write_entries("fresh", true));
	}
}

function write_highlight_entries (sid) {
	return function ( data ) {
		const feeds = data.content;
		const html_titles = feeds.map(function (f, i) { 
			return "<ul><h2>" + f.title + '</h2>\n<div id="hl'+ i +'" ><p>Chargement ...</p></div></ul>';
		} ).join('\n');

		$("li#highlight").html(html_titles);

		feeds.forEach(function (f, i) { 
			const feed_id = f.id;
			auto_update(load_highlight_feeds(sid,feed_id,"hl"+ i));
		})	;
	}
}



function init_highlight_feeds (sid) {
	tt_rss_get_categories(sid, 
		function (data) {
			const cats = data.content;
			const highlight_feed = cats.filter(function (cat) {return (cat.title == "Highlight") } );
			const highlight_id = highlight_feed[0].id;
			tt_rss_get_feeds_from_cat_id(sid, highlight_id, write_highlight_entries(sid))
		}
	);

}

function login(user, password){
	return tt_rss_query("login", {"user":user,"password":password}, 
		function ( data ) {
			console.log(data.content);
			const sid = data.content.session_id;
			init_highlight_feeds(sid);
			auto_update(load_fresh_feeds(sid));
		}
	)
}
