function get_feeds_from_cat_id (sid, cb) {

	return tt_rss_get_categories(sid, 
		function (data) {
			const cats = data.content;
			const highlight_feed = cats.filter(function (cat) {return (cat.title == "Highlight") } );
			const highlight_id = highlight_feed[0].id;
			tt_rss_get_feeds_from_cat_id(sid, highlight_id, cb)
		}
	);

}

function is_source_from_title(link) {
	return link.startsWith("http://news.google.com");
}

function entry_from_title(e) {
	const begin = e.title.lastIndexOf(" - ");
	const end = e.title.length - 1;
	return {"title" : e.title.substr(0, begin), 
			"source" : e.title.substr(begin + 3, end), 
			"link" : e.link
	};
}

function entry_default(e) {
	return {"title" : e.title, 
			"source" : e.feed_title, 
			"link" : e.link
	};
}

function filter_feed_entry (e, from_title) {
	if (from_title)
		return entry_from_title(e);
	else
		return entry_default(e);
}

function source_to_html (e){
		return '<br>\n\r\r<small>' + e.source + '</small>\n';
}

function title_to_html (e){
	return '\r\r<a target="_blank" href="' + e.link +'">' + e.title + '</a>';
}

function entry_to_html (show_source) {
	return function(entry){
		const from_title = is_source_from_title(entry.link);
		const e = filter_feed_entry(entry,from_title);
		return	'\r<li>\n'
				+ title_to_html(e)
				+ ((show_source || from_title) ? source_to_html(e) : "")
				+'\r</li>\n'; 
	} 
}

function write_entries (id, show_source) {
	return function ( data ) {
		const entries = data.content;
		const html_entries = entries.map(entry_to_html(show_source));
		$("p#" + id).html("<ul>\n" + html_entries.join("\n") + "</ul>");
	}
}

function write_highlight_entries (sid) {

	return function ( data ) {
		const feeds = data.content;
		const html_titles = feeds.map(function (f, i) { 
			return "<h2>" + f.title + '</h2>\n<p id="hl'+ i +'">Chargement ...</p>';
		} ).join('\n');

		$("div#highlight").html(html_titles);

		feeds.forEach(function (f, i) { 
			const id = f.id;
			tt_rss_get_headline (sid, id, 10, write_entries("hl"+i, false));
		})	;
	}
}

function load (sid) {
	tt_rss_get_headline (sid, -3, 30, write_entries("fresh", true));
	get_feeds_from_cat_id(sid, write_highlight_entries(sid));
}

function login(user, password){

	return tt_rss_query("login", {"user":user,"password":password}, 
		function ( data ) {
			const sid = data.content.session_id;
			load(sid);
		}
	)

}
