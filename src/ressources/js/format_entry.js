
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
