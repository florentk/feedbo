const UPDATE_INTERVAL = 30000;
const FEED_ID_FRESH_ENTRY = -3;
const NB_HIGHLIGHT_ENTRY = 10;
const INITIAL_NB_FRESH_ENTRY = 45;
const MORE_NB_FRESH_ENTRY = 20;

function extract_site(url) {
	return url.split("/")[0] + "//" + url.split("/")[2]
}

function auto_update (f) {
	f.call();
	return setInterval(f, UPDATE_INTERVAL);
}

function join_entries (html_entries) {
	const d = new Date();
	return html_entries.join("\n") + "<small>"+d.toString()+"</small>\n"
}

function write_entries (id, show_source) {
	return function ( data ) {
		const entries = data.content;
		const html_entries = join_entries(entries.map(entry_to_html(show_source)));
		$("div#" + id).html(html_entries);
	}
}

function append_entries (id, show_source) {
	return function ( data ) {
		const entries = data.content;
		const html_entries = join_entries(entries.map(entry_to_html(show_source)));
		$("div#" + id).append(html_entries);
	}
}

function load_highlight_feeds(sid,feed_id,div_id) {
	return function () {
		tt_rss_get_headline (sid, feed_id, NB_HIGHLIGHT_ENTRY, 0,write_entries(div_id, false));
	}
}


function write_highlight_entries (sid) {
	return function ( data ) {
		const feeds = data.content;
		const html_titles = feeds.map(function (f, i) { 
			return '<ul><h2><a href="' + extract_site(f.feed_url) + '">'  + f.title + '</a></h2>\n<div id="hl'+ i +'" ><p>Chargement ...</p></div></ul>';
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

function load_fresh_feeds (sid, nb) {
	return function () {
		tt_rss_get_headline (sid, FEED_ID_FRESH_ENTRY, nb, 0 ,write_entries("fresh", true));
	}
}

function update_more(sid,skip,auto_update_id) {
	$("a#more").attr("href", 'javascript:more("' + sid + '",'+ skip + ',' +  auto_update_id + ');');
	
	
	$( window ).scroll(function(e) {
		const height = e.currentTarget.document.body.scrollHeight;
		const pos = e.currentTarget.scrollY + e.currentTarget.innerHeight;
		const rate =  pos / height;
		if ( rate == 1 ) {
			more(sid,skip,auto_update_id);
			$(this).unbind(e);
		}
	})	
}

function init_fresh_entry (sid,nbFreshEntry) {
	const auto_update_id = auto_update(load_fresh_feeds(sid,nbFreshEntry));
	update_more(sid, nbFreshEntry, auto_update_id);

}

function more(sid,skip,auto_update_id) {
	//append additionnal entries
	const newNbFreshEntry = skip+MORE_NB_FRESH_ENTRY;
	tt_rss_get_headline (sid, FEED_ID_FRESH_ENTRY, MORE_NB_FRESH_ENTRY, skip ,append_entries("fresh", true));
	
	//update auto-update
	clearInterval(auto_update_id);
	const new_auto_update_id = setInterval(load_fresh_feeds(sid,newNbFreshEntry), UPDATE_INTERVAL);
	update_more(sid, newNbFreshEntry, new_auto_update_id);
}

function login(user, password){
	return tt_rss_query("login", {"user":user,"password":password}, 
		function ( data ) {
			console.log(data.content);
			const sid = data.content.session_id;
			
			init_highlight_feeds(sid);			
			init_fresh_entry(sid,INITIAL_NB_FRESH_ENTRY);
	
		}
	)
}

function onload(user, password) {
	login(user,password);
}
