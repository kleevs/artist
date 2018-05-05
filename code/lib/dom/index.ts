export function createElement(html: string): Element {
	html = html.trim();
	var isTr = html.match(/^<tr/);
	var isTd = html.match(/^<td/);
	var parser: any =  document.createElement("div");
	if (isTr || isTd) { 
		var table = document.createElement("table");
		parser = document.createElement("tbody");
		table.appendChild(parser);

		if (isTd) {
			var parent = parser;
			parser.appendChild(parser = document.createElement("tr"));
		}
	}

	parser.innerHTML = html;
	return <Element>parser.firstChild;
};