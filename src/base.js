import EventEmitter from 'eventemitter3';

class Base {
	constructor(){				
		this.eventEmitter=new EventEmitter();
		this.tick=null;
	}
	
	setState(x,y){		
		this.state[x]=y;		
		this.state=Object.assign({},this.state);		
		
		if (this.tick!=null){
			clearTimeout(this.tick);
		}
		this.tick=setTimeout( ()=>{
			this.eventEmitter.emit('statechange',{});	
		});						
		
	}
}

export default Base;