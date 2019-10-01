const $ = (name) => {
    return document.querySelector(name);
}

const focusIn = () => {
    tagDiv.style.borderColor='#2cb400';
}

const focusOut = () => {
    tagDiv.style.borderColor='#dadada';
}

const RemoveItself = (elem) => {
    let item = elem.parentNode;
    let parent = item.parentNode;
    parent.removeChild(item);
}

const customReset = () => {
    const registerForm = document.querySelector(".register_form");
    registerForm.reset();
    resetTag();
    resetSpan();
    closeLayer();
}

const resetSpan = () => {
    const redSpan = document.querySelectorAll(".red_text");
    const greenSpan = document.querySelectorAll(".green_text");

    redSpan.forEach(elem => {
        elem.innerHTML = "";
    });
    greenSpan.forEach(elem => {
        elem.innerHTML = "";
    });
}

const removeChildAll = (parent) => {
    while (parent.hasChildNodes()){
        parent.removeChild(parent.firstChild); 
    }
}

const checkAll = () => {
    let returnValue = checkInputAll();
    if(returnValue.length == 0){  
        document.forms[0].submit();
    }else{  
        registerLayer(returnValue);
    }
}

const checkInputAll = () => {
    const redSpan =  document.querySelectorAll(".red_text");
    let errorText = {id_check : "아이디를 형식에 맞게 입력해주세요.",
                    pwd_check : "비밀번호를 형식에 맞게 입력해주세요.",
                    pwd_confirm_check : "비밀번호가 일치하지 않습니다.",
                    name_check : "이름을 입력해주세요."};
    const redList = [];

    redSpan.forEach(elem => {
        redList.push(errorText[elem.id]);
    })
    return redList;
}
