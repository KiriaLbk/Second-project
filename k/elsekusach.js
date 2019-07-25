import { footballClubs,loadDiv,addList } from "./kursach.js";
let ContentBlock=function(){
	let content=document.getElementsByTagName('div')[3];
	return content;
}
function getMainButton(){
	let mbutton;
	mbutton=document.createElement('button');
	mbutton.classList.add('buttaddanddel');
	mbutton.innerHTML='Удалить/Добавить';
	ContentBlock().appendChild(mbutton);
	return mbutton;
}
let MainButton=getMainButton();
let Indent=function(){
	let br=document.createElement('br');
	ContentBlock().appendChild(br);
	return br;
}
function getAddButton(){
	let addButt;
	addButt=document.createElement('button');
	addButt.innerHTML='Добавить';
	addButt.style.display='none';
	ContentBlock().appendChild(addButt);
	Indent();
	return addButt;
}
let AddButton=getAddButton();
function getDeleteButton(){
	let deleteButt=document.createElement('button');
	deleteButt.innerHTML='Удалить';
	deleteButt.style.display='none';
	ContentBlock().appendChild(deleteButt);
	return deleteButt;
}
let DeleteButton=getDeleteButton();
let ChangeMainButton=function(){
	MainButton.addEventListener("click",function(event){
		AddButton.style.display="block";
		DeleteButton.style.display="block";
	});
	MainButton.addEventListener('dblclick',function(event){
		AddButton.style.display="none";
		DeleteButton.style.display="none";
	});
}
function getAddInputList(x,z){
	let inpArr=[];
	for (let j=0;j<6;j++) {
		if (j  == 4){
			inpArr[j]=document.createElement('button');
			inpArr[j].innerHTML=props[j];
			ContentBlock().insertBefore(inpArr[j],z);
			inpArr[j].style.display=x;
			continue;
		}
		inpArr[j]=document.createElement('input');
		inpArr[j].setAttribute('type','text');
		inpArr[j].setAttribute('placeholder',props[j]);
		ContentBlock().insertBefore(inpArr[j],z);
		inpArr[j].style.display=x;
	}
	return inpArr;
}
function getAddProps(){
    let props=['Фото','Клуб','Страна','Тренер','Основной состав','Количество трофеев'];
    return props;
}
let props=getAddProps();
let AddInputList=getAddInputList("none",AddButton);
let AddListButton=AddInputList[4];
function getAddLineupList(z){
	let mainLineprops=['ВРТ', 'ЦЗ', 'ЦЗ', 'ПЗ', 'ЛЗ', 'ЦП', 'ЦОП', 'ЦП'
      ,'ПА', 'ФРВ', 'ЛА'];
    let inpmainLine=[];
    for (let j=0;j<11;j++){
    	inpmainLine[j]=document.createElement('input');
    	inpmainLine[j].setAttribute('type','text');
    	inpmainLine[j].setAttribute('placeholder',mainLineprops[j]);
    	ContentBlock().insertBefore(inpmainLine[j],z);
    	inpmainLine[j].style.display="none";
    }
    return inpmainLine;
}
let AddLineupList=getAddLineupList(AddListButton);
function ChangeAddListButton(button,LineUpList){
    	button.addEventListener('click',function(e){
    		for (let j=0;j<11;j++){
    			LineUpList[j].style.display='block';
    		}
    	});
    	button.addEventListener("dblclick",function(){
    		for (let j=0;j<11;j++){
    			LineUpList[j].style.display='none';
    		}
    	});
}
function getButtonisReady(x,y){
    let isReadyButt=document.createElement('button');
    isReadyButt.innerHTML='Готово';
    isReadyButt.style.display=y;
    ContentBlock().insertBefore(isReadyButt,x);
    return isReadyButt;
}
let ButtonisReady=getButtonisReady(AddButton,'none');
function ChangeAddButtonisReady(){
    ButtonisReady.addEventListener('click',function(e){
    let newClub={};
    if(AddInputList[1].value=='' || AddInputList[2].value==''){
   		alert('Введите название клуба и страну.Эти поля обязательны для заполнения!!!');
    }
    else{
    	let variablefirst=AddInputList[1].value.match(/[^0-9]+/g);
    	let variabletwo=AddInputList[2].value.match(/[^0-9]+/g);
    	if (variablefirst==null || variabletwo==null){
    		alert('Имена не содержат символов от 0 до 9!Перезаполните поле,пожалуйста!');
    	}
    	else{
    		let divAr=[];
    		let cnt=1;
    		for (let j=0;j<AddInputList.length;j++) {
    			if(j == 0) {
    				if (AddInputList[j].textContent==""){
    					newClub[props[j]]='images/placeholder.png';
    					continue;
    				}
    				else{
    					newClub[props[j]]='images/' + AddInputList[j].value + '.png';
    					continue;
    				}
    			}
    			newClub[props[j]]=AddInputList[j].value;
    		}
    		let replaceArr=[];
    		let objectreplaceArr={};
    		for(let j=0;j<11;j++){
    			objectreplaceArr['num']=j+1;
    			objectreplaceArr['name']=AddLineupList[j].value;
    			replaceArr[j]=objectreplaceArr;
    			objectreplaceArr={};
    		}
    		newClub[props[4]]=replaceArr;
    		footballClubs[footballClubs.length]=newClub;
    		let l=JSON.stringify(footballClubs);
    		localStorage.setItem('povar',l);
    		loadDiv(JSON.parse(localStorage.getItem('povar')),divAr);
    		addList(cnt,divAr);
    	}
    }
    });
}
function ChangeAddButton(){
    AddButton.addEventListener('click',function(event){
    	ButtonisReady.style.display='block';
    	for (let j=0;j<6;j++){
    		AddInputList[j].style.display='block';
    	}
    }); 
    AddButton.addEventListener('dblclick',function(event){
    	ButtonisReady.style.display='none';
    	for (let j=0;j<6;j++){
    		AddInputList[j].style.display='none';
    	}
    });
} 
function ChangeDeleteButton(){
    DeleteButton.addEventListener('click',function(event){
    	DeleteList.style.display='block';
    	ButtonisReads.style.display='block';
    });    
    DeleteButton.addEventListener('dblclick',function(){
    	DeleteList.style.display='none';
    	ButtonisReads.style.display='none';
    });
}
function getDeleteList(){
    let deleteList=document.createElement('input');
    deleteList.setAttribute('type','text');
    deleteList.style.display='none';
    deleteList.setAttribute('placeholder','Клуб');
    ContentBlock().insertBefore(deleteList,DeleteButton);
    return deleteList;
}
let DeleteList=getDeleteList();
let ButtonisReads=getButtonisReady(DeleteButton,'none');
function ChangeDeleteButtonisReady(){
    ButtonisReads.addEventListener('click',function(event){
    	let cnt=1;
    	let divAr=[];
    	let cntr=-1;
    	let variable;
    	for (let i=0;i<footballClubs.length;i++){
    			if (DeleteList.value==footballClubs[i]['Клуб']){
    				cntr=i;
    			}
    		}
    	if ( cntr!= -1 || DeleteList.value!=""){
    		for (let i=cntr;i<footballClubs.length;i++){
    			footballClubs[i]=footballClubs[i+1];
    		}
    		let footClubs=footballClubs.slice(null,-1);
    		let data=JSON.stringify(footClubs);
    		localStorage.setItem('povar',data);
    		loadDiv(JSON.parse(localStorage.getItem('povar')),divAr);
    		addList(cnt,divAr);
    	}
    	else{
    		alert('Такого клуба нет в списке');
    	}
    });
}
export { ChangeDeleteButtonisReady,ChangeMainButton,ChangeAddButton,
	    ChangeAddListButton,ChangeAddButtonisReady,ChangeDeleteButton,MainButton,ContentBlock,
	    getAddInputList,props,getAddLineupList,AddListButton,getButtonisReady,AddLineupList };