import { View } from 'node_modules/artist/dist/artist'; 
 
@View<Startup>({ 
	template: "dist/template/layout.html", 
	binding: { 
	} 
}) 
export class Startup { 
	private observable: { view: any }; 
	 
	constructor() { 
	} 
} 