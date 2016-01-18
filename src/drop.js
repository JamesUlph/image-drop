import EventEmitter from 'eventemitter3';
import Base from './base';

class Drop extends Base {
	constructor(){
		super();

		if (__DEV__) {
			console.log('drop init');
		}

		this.eventEmitter=new EventEmitter();
		this.tick=null;

		this.eventEmitter.on('statechange',()=>{

			if (__DEV__){
				console.log('state change');
			}

			let drop=this.state.dropzone;

			// update the state
			drop.style.background=this.state.background;

			if (this.state.border){
				drop.style.border=this.state.border;
			}
			else {
				drop.style.border='';
			}

			document.title=this.state.title;
		})

		this.state={
			defaultColor:'#00F'
		};
	}

	init(){

	}

	createDropzone(){

		let zone=document.createElement('div');

		this.state['dropzone']=zone;

		//child.id="dropzone";
		zone.style.backgroundColor=this.state.defaultColor;
		zone.style.width=200+'px';
		zone.style.height=200+'px';
		zone.draggable=true;

		//let t=document.createTextNode('This is a test');
		//child.appendChild(t);

		document.body.appendChild(zone);

		zone.addEventListener('dragenter',(e)=>{
			this.doNothing(e);
			this.setState('background','#030');
			this.setState('border','solid 2px #FFF');
		},false)


		zone.addEventListener('dragleave',(e)=>{
			this.doNothing(e);
			this.setState('background',this.state.defaultColor);
			this.setState('border',null);
		})

		zone.addEventListener('dragover',(e)=>{
			this.doNothing(e);
		},false)


		zone.ondrop=(e)=>{
			this.doNothing(e);
			this.setState('background','#0F0');
			let files=e.dataTransfer.files;

			//let item=e.dataTransfer.items[0];

			let item=e.dataTransfer.files[0];

			let items=e.dataTransfer.files;





			if (item.webkitGetAsEntry!=null){
				//file=item.webkitGetAsEntry();
			}
			else {
			}
			//let file=e.dataTransfer.items[0].webkitGetAsEntry();

			for (let i=0, file; file=items[i];i++){
				console.log(file);
				this.readTextFile(file);
			}


			//this.readTextFile(files[0]);



		};

		return;

		zone.addEventListener('dragstart',(e)=>{
			e.dataTransfer.effectAllowed='copy';
			e.dataTransfer.setData('text/html',this.innerHTML);
			//this.doNothing(e);

		},false);

/*
		zone.addEventListener('dragenter',(e)=>{
			console.log('drag',e);
			this.doNothing(e);
			this.setState('background','#FF0');
			this.setState('title','dragging start');

		},false);

		zone.addEventListener('dragover',(e)=>{
			this.doNothing(e);
			alert('drag over');
			return false;
		},false);



		zone.addEventListener('dragleave',(e)=>{
			console.log('drag leave',e);

			this.setState('background','#500');
			this.setState('title','dragging stop');


		},false)
*/




		//zone.addEventListener('drop',this.handleDrop,false);

		zone.addEventListener('click',(e)=>{
			this.setState('background','#00f');
		})

	}



	doNothing(event){
			if (event.stopPropogation) {
				event.stopPropogation();
			}

			event.preventDefault();
	}

	/*
	setState(x,y){
		this.state[x]=y;

		if (this.tick!=null){
			clearTimeout(this.tick);
		}
		this.tick=setTimeout( ()=>{
			this.ee.emit('statechange',{});
		});

	}
	*/

	//--------------------------------------------------
	readTextFile(file){

		console.log('reading file ',file);

		let reader=new FileReader();


		let filetype='';

		if (file.type==''){
			filetype='application/octet-stream';
		}
		else {
			filetype=file.type;
		}

		console.log(filetype);
		console.log(file.name)



		reader.onloadend=(event)=>{
			console.log('done ',event);
			this.setState('background',this.state.defaultColor);
			if (event.target.readyState==FileReader.DONE){
				let content=reader.result;
				//let chars=new Uint8Array(reader.result);




				//alert(filetype);

				console.log(file);





				//let blob=new Blob([chars],{type:filetype});

				this.uploadFile(file,file,filetype,file);
				return;
				console.log(chars.length);

				let img=this.createImage(blob);

				img.addEventListener('click',(e)=>{
					img.remove();
					//img.removeChild(img);
				})
			}
		}

		//reader.readAsArrayBuffer(file);
		//reader.readAsBinaryString(file);
		//this.uploadFile(file,file,file,file);

		reader.readAsDataURL(file);
	}


	createImage(blob){


		let outer=document.createElement('div');
		outer.classList.add('outer');





		let box=document.createElement('div');
		box.classList.add('box');
		let t=document.createTextNode('This is a test');
		box.appendChild(t);

		outer.appendChild(box);

		let container=document.createElement('span');
		container.classList.add('container');
		outer.appendChild(container);
		let img=document.createElement('img');
		let urlCreator=window.URL || window.webkitURL;
		let imageURL=urlCreator.createObjectURL(blob);

		img.src=imageURL;

		container.appendChild(img);
		document.body.appendChild(outer);

		img.onload=(e)=>{

			let w=img.width;
			let h=img.height;

			img.style.border='solid 1px #000';

			outer.style.width=w+'px';
			outer.style.height=h+'px';

			//box.appendChild(container);

			//box.width=200;
			//box.height=h/2;

			//document.body.appendChild(box);
		}

		return box;

	}

	uploadFile(file,content,filetype,result){
		console.log('uploading file');

		let dashes = '--';
    	let boundary = 'aperturephotoupload';
    	let crlf = "\r\n";

		let name="fred";
		let data = dashes + boundary + crlf + "Content-Disposition: form-data;" + "name=\"file.msg\";" + "filename=\"" + (encodeURIComponent(name)) + "\"" + crlf + "Content-Type: " + filetype + crlf + crlf + content + crlf + dashes + boundary + dashes;

		console.log('uploading...',result.name);

		var req=new XMLHttpRequest();
		req.open("POST","http://localhost:3000",true);

		var formData=new FormData();

		formData.append("file",result);

		//req.setRequestHeader("content-type","application/x-www-form-urlencoded");

		req.send(formData);
	}
}

export default Drop;
