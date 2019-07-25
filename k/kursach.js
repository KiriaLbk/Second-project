import  { ChangeDeleteButtonisReady,ChangeMainButton,ChangeAddButton,
	    ChangeAddListButton,ChangeAddButtonisReady,ChangeDeleteButton,MainButton,ContentBlock,
	    getAddInputList,props,getAddLineupList,AddListButton,getButtonisReady,AddLineupList } 
	     from "./elsekusach.js";
import { footballClubs } from "./bd.js";
export { footballClubs,loadDiv,addList };
let l=JSON.stringify(footballClubs);
localStorage.setItem('povar',l);
let divAr=[];
let divArelse=[];
let pArelse=[];
let cnt=0;
function createBlocks(blocks,divAr,load){
	let div=document.createElement("div");
	let image=document.createElement('img');
	div.classList.add('block');
	image.classList.add('imageofblock');
	image.setAttribute('src',blocks['Фото']);
	div.appendChild(image);
	let prop=['Клуб','Страна','Тренер','Основной состав','Количество трофеев'];
	for (let j=0;j<prop.length;j++){
		let p=document.createElement('p');
		if (prop[j] == 'Основной состав'){
			let span=document.createElement('span');
			span.innerHTML='Основной состав:';
			p.appendChild(span);
			div.appendChild(p);
			let br=document.createElement('br');
			p.appendChild(br);
			blocks[prop[j]].forEach(function(el){
				let pr=['num','name'];
				for(let b=0;b < pr.length; b++){
					let span=document.createElement('span');
					span.innerHTML=el[pr[b]];
					p.appendChild(span);
					div.appendChild(p);
				}
				let br=document.createElement('br');
				p.appendChild(br);
			});
			
			continue;
		}
		p.innerHTML=prop[j] + ':' + blocks[prop[j]];
		div.appendChild(p);
	}
	divAr[load]=div;
	return div;
}
function loadDiv(objects,divAr){
	let load=0;
	objects.forEach(function(el){
		ContentBlock().appendChild(createBlocks(el,divAr,load));
		load++;
	});
}
function getOl(){
	let ol=document.createElement('ol');
	return ol;
}
function getClubFromSearchWindow(){
	let buttonWindow=document.getElementsByClassName('btn')[0];
	buttonWindow.addEventListener('click',function(e){
		let pr='';
		let t=0;
		let input=document.querySelector('input');
		for (let n=0;n<pArelse.length;n++){
			pr='Клуб:' + input.value;	
			if(pArelse[n] == pr){
				ol.style.display='none';
				ContentBlock().appendChild(divArelse[n]);
				divArelse[n].style.display='block';
				t=n;
				break;
			}
			if (pArelse[n] != input.value){
				ol.style.display='none';
			}
		}
		let buttonBack=document.createElement('button');
		ContentBlock().appendChild(buttonBack);
		buttonBack.innerHTML='Назад';
		buttonBack.addEventListener('click',function(e){
			ol.style.display='block';
			divArelse[t].style.display='none';
			ContentBlock().removeChild(buttonBack);
		});
	});
}
function getnameContentBlock(){
	let namecontent=document.getElementsByClassName('content__p')[0];
	return namecontent;
}
function getNumberOfElement(e){
	let p=0;
	for (let m=0;m<divArelse.length;m++){
		if (("Клуб:" + e.target.textContent)==pArelse[m]){
			p=m;
			break;
		}
	}
	return p;
}
function getChangeButt(){
	let buttChange=document.createElement('button');
	buttChange.classList.add('btnf');
	buttChange.innerHTML='Изменить';
	buttChange.style.display="block";
	return buttChange;
}
let ChangeButt=getChangeButt();
let nameContentBlock=getnameContentBlock();
let ol=getOl();
function ChangeOl(){
	ol.addEventListener('click',function(e){
		let p=getNumberOfElement(e);
		MainButton.style.display='none';
		ContentBlock().appendChild(divArelse[p]);
		divArelse[p].style.display='block';
		ol.style.display='none';
		ContentBlock().appendChild(ChangeButt);
		let button=document.createElement('button');
		button.classList.add('btnf');
		ContentBlock().appendChild(button);
		button.innerHTML='Назад';
		nameContentBlock.style.display='none';
		ChangeButton(p,button);
		button.addEventListener('click',function(e){
			ol.style.display='block';
			ChangeButt.style.display="none";
			divArelse[p].style.display='none';
			ContentBlock().removeChild(button);
			MainButton.style.display='block';
			nameContentBlock.style.display='block';
		});
	});
}
function ChangeButton(p,button){
	ChangeButt.addEventListener("click",function(e){
		button.style.display="none";
		divArelse[p].style.display="none";
		let ButtonisGo=getButtonisReady(ChangeButt,"block");
		let AddinputList=getAddInputList("block",ButtonisGo);
		let AddlistButt=AddinputList[4];
		let AddlineupList=getAddLineupList(AddlistButt);
		ChangeableButtonisReady(p,AddinputList,AddlineupList,ButtonisGo);
		ChangeAddListButton(AddlistButt,AddlineupList);
		ChangeButt.style.display="none";
	});
}
function ChangeableButtonisReady(p,AddinputList,AddlineupList,ButtonisGo){
	ButtonisGo.addEventListener("click",function(event){
		let divAr=[];
		let cnt=1;
		ol.style.display="block";	
		let newOptionsClub={};
		let lineupList=[];
		let lineupOne={};
		for(let n=0;n<11;n++ ) {
			lineupOne['num']=n+1;
			lineupOne['name']=AddlineupList[n].value;
			lineupList[n]=lineupOne;
			lineupOne={};
		}
		for(let j=0;j<props.length;j++)
		{
			if(j==4){
				newOptionsClub[props[j]]=lineupList;
				continue;
			}
			newOptionsClub[props[j]]=AddinputList[j].value;
		}
		for(let b=0;b<11;b++) {
			if(lineupList[b]['name']=="") {
				continue;
			}
			footballClubs[p][props[4]][b]["name"]=lineupList[b]['name'];
		}
		for(let n=0;n<props.length;n++) {
			if (n==0 || n==4 || newOptionsClub[props[n]]=='')
				{
					continue;
				}
			footballClubs[p][props[n]]=newOptionsClub[props[n]];
		}
		for(let b=0;b<AddinputList.length;b++){
			AddinputList[b].style.display="none";
		}
		ButtonisGo.style.display="none";
		for(let b=0;b<AddlineupList.length;b++){
			AddlineupList[b].style.display="none";
		}
		MainButton.style.display="block";
		nameContentBlock.style.display='block';
		let bd=JSON.stringify(footballClubs);
    	localStorage.setItem('povar',bd);
    	loadDiv(JSON.parse(localStorage.getItem('povar')),divAr);
    	addList(cnt,divAr);
	});
}
function addList(cnt,divAr){
	let li=[];
	let a=[];
	let arr=[];
	ContentBlock().appendChild(ol);
	let pelse=[];
	for (let b=0;b<divAr.length;b++){
		pelse[b]=divAr[b].getElementsByTagName('p')[0].textContent;
		divAr[b].style.display='none';
	}
	for (let i=0;i<pelse.length;i++ ){
		pArelse[i]=pelse[i];
	}
	if (cnt == 1){
		while (ol.lastChild) {
   			 ol.removeChild(ol.lastChild);
  		}
	}
	for (let j=0;j<pelse.length;j++){
		pelse[j]=pelse[j].slice(5,);
	}
	for (let j=0;j<pelse.length;j++){
			arr[j]=pelse[j];
			a[j]=document.createElement('a');
			li[j]=document.createElement('li');
			a[j].innerHTML=pelse[j];
			li[j].appendChild(a[j]);
			ol.appendChild(li[j]);
	}
	for (let i=0;i<divAr.length;i++){
		divArelse[i]=divAr[i];
	}
	divAr=[];
}
document.addEventListener("DOMContentLoaded", function(){
	ChangeMainButton();
	ChangeAddButton();
	ChangeOl();
	ChangeAddListButton(AddListButton,AddLineupList);
	ChangeAddButtonisReady();
	ChangeDeleteButton();
	ChangeDeleteButtonisReady();
	loadDiv(JSON.parse(localStorage.getItem('povar')),divAr);
	addList(cnt,divAr);
	getClubFromSearchWindow();
});