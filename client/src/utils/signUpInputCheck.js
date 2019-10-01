const idChecker = {
    registerEvent() {
        const idInput = document.querySelector("#id_input");
        idInput.addEventListener("input", () => {
            this.idCheck(idInput.value);
        })
        idInput.addEventListener("focusout",() => {
            this.duplicateCheck(idInput.value)
        })
    },
    idCheck(idInput) {
        const idSpan = document.querySelector("#id_check");
        const idRegExp = /^[A-Za-z0-9-_]{5,20}$/;

        if(!idRegExp.test(idInput)){
            changeAttribute(idSpan,"red_text","5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.");
        }else{
            changeAttribute(idSpan,"green_text","사용 가능한 아이디입니다.");
        }
    },
    duplicateCheck(idInput) {
        const idSpan = document.querySelector("#id_check");
        axios({
            method: 'post',
            url: '/dbCheck/duplicateCheck',
            data: {
                id : idInput
            }
        }).then(res => {
            if(res.data){
                changeAttribute(idSpan,"red_text","이미 사용중인 아이디입니다.");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

const pwdChecker= {
    registerEvent() {
        const pwdInput = document.querySelector("#pwd_input");
        const pwdConfirmInput = document.querySelector("#pwd_confirm_input");
        pwdInput.addEventListener("input", () => {
            this.pwdCheck(pwdInput);
            if(pwdConfirmInput.value !== ''){
                this.pwdConfirmCheck(pwdConfirmInput,pwdInput);
            }
        })
        pwdConfirmInput.addEventListener("input", () => {
            this.pwdConfirmCheck(pwdConfirmInput,pwdInput);
        })
    },
    pwdCheck(pwdInput) {
        const pwdSpan = document.querySelector("#pwd_check");

        if(pwdInput.value.length < 8 || pwdInput.value.length > 17){
            changeAttribute(pwdSpan,"red_text","8자 이상 16자 이하로 입력해주세요.");
        }else if(!(new RegExp(/[A-Z]/)).test(pwdInput.value)){
            changeAttribute(pwdSpan,"red_text","영문 대문자를 최소 1자 이상 포함해주세요.");
        }else if(!(new RegExp(/[0-9]/)).test(pwdInput.value)){
            changeAttribute(pwdSpan,"red_text","숫자를 최소 1자 이상 포함해주세요.");
        }else if(!(new RegExp(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi)).test(pwdInput.value)){
            changeAttribute(pwdSpan,"red_text","특수문자를 최소 1자 이상 포함해주세요.");
        }else{
            changeAttribute(pwdSpan,"green_text","안전한 비밀번호입니다.");
        }
    },
    pwdConfirmCheck(pwdConfirmInput,pwdInput) {
        const pwdConfirmSpan = document.querySelector("#pwd_confirm_check");
        if(pwdConfirmInput.value !== pwdInput.value){
            changeAttribute(pwdConfirmSpan,"red_text","비밀번호가 일치하지 않습니다.");
        }else{
            changeAttribute(pwdConfirmSpan,"green_text","비밀번호가 일치합니다.");
        }
    }
}

const nameChecker = {
    registerEvent() {
        const nameInput = document.querySelector("#name_input");
        nameInput.addEventListener("input", () => {
            this.nameCheck(nameInput);
        })
    },
    nameCheck(nameInput) {
        const nameSpan = document.querySelector("#name_check");
        if(nameInput.value == ""){
            changeAttribute(nameSpan,"red_text","");
        }else{
            changeAttribute(nameSpan,"green_text","");
        }
    }
}


const changeAttribute = (selector,className,str) => {
    selector.className = className;
    selector.innerHTML = str;
}

const registerEventListener = () => {
    idChecker.registerEvent();
    nameChecker.registerEvent();
    pwdChecker.registerEvent();
}
registerEventListener();