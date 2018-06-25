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

export function dispatchEvent(element: Element, type: string);
export function dispatchEvent<T>(element: Element, type: string, data: T);
export function dispatchEvent<T>(element: Element, type: string, data?: T) {
	try { 
		var event = typeof(Event) === 'function' && new Event(type, { bubbles:true }) || 
			(() => { 
				var event = document.createEvent("Event"); 
				event.initEvent(type, true, true);
				return event;
			})();

		(<any>event).data = data;
		element.dispatchEvent(event);
	} catch (e) {
		var event = document.createEvent("Event"); 
		event.initEvent(type, true, true);
		return event;

		(<any>event).data = data;
		element.dispatchEvent(event);
	}
}