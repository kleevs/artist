import { View } from 'node_modules/artistejs/dist/artiste'; 
 
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