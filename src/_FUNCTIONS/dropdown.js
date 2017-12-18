export const expand= (id)=>{
    const elem = document.getElementById(id);
    elem.style.maxHeight = '' + elem.scrollHeight + 'px';
};

export const collapse = (id)=>{
    document.getElementById(id).style.maxHeight = '0px';
};

export const toggle = (id)=>{
    const elem = document.getElementById(id);
    elem.style.maxHeight = 
    elem.style.maxHeight === '' + elem.scrollHeight + 'px' ?
         '0px':
         '' + elem.scrollHeight + 'px';
}

export const toggleByBtn = (btnId)=>{
    // btn.value is the id of targeted dropdown
    return()=>{
    const togBtn = document.getElementById(btnId);
    const dropElem = document.getElementById(togBtn.value);
    if(dropElem.style.maxHeight === ''+dropElem.scrollHeight+'px'){
        dropElem.style.maxHeight = '0px';
        togBtn.style.transform = 'rotatez(0deg)';
    } else {
        dropElem.style.maxHeight = ''+dropElem.scrollHeight+'px';
        togBtn.style.transform = 'rotatez(180deg)';
        }
    }
}

export const collapseByBtn = (btnId)=>{
    // btn.value is the id of targeted dropdown
    return()=>{
        const togBtn = document.getElementById(btnId);
        // Keeps from trying to find element before render
        if(togBtn){
            const dropElem = document.getElementById(togBtn.value);
            dropElem.style.maxHeight = '0px';
            togBtn.style.transform = 'rotatez(0deg)';
        } 
    }
}
export const expandByBtn = (btnId)=>{
    // btn.value is the id of targeted dropdown
    return()=>{
        const togBtn = document.getElementById(btnId);
        if(togBtn){
            const dropElem = document.getElementById(togBtn.value);
            dropElem.style.maxHeight = ''+dropElem.scrollHeight+'px';
            togBtn.style.transform = 'rotatez(180deg)';
        } else {
            console.log('WARNING: no element found with that id')
        }
    }
}

export const setByBool = (btnId, isOpen)=>{
    if(isOpen){
        expandByBtn(btnId)();
    } else {    
        collapseByBtn(btnId)();
    }
}

export const  getMaxHeight = (id)=>{
    return '' + document.getElementById(id).scrollHeight + 'px';
}