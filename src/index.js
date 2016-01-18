import Drop from './drop';

class Test {
	
	constructor(){
				
				
		this.drop=new Drop();
	
		
		
		this.drop.init();
		
		/*
		
		let child=document.createElement('div');
		
		child.draggable=true;
		
		let t=document.createTextNode('This is a test');
		
		child.appendChild(t);
		
		let app=document.getElementById("app");
		
		document.body.replaceChild(child,app);
		
		let body=document.body;
		*/
		
		window.addEventListener('load', ()=>{			
			this.doStuff();
		})
	}
	
	doStuff(){
		this.drop.createDropzone('dropzone');
					
		
	}
		
}

export default new Test();