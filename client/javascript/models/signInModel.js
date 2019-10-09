import {$,$$} from './util.js';

const isUser = async() => {
    const idInput = $("#login_id_input");
    const pwdInput = $("#login_pwd_input");
    const errorMsg = $("#red_text");

    if(idInput.value == "" || pwdInput.value == ""){
        errorMsg.style.display = 'inline';
    }else{
        if(await checkUser(idInput.value,pwdInput.value)){
            window.location.href = '/';
        }else{
            errorMsg.style.display = 'inline';
        }
    }
}

const checkUser = async(id,pwd) => {
    return fetch('/signIn/submit', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, password: pwd })
    })
    .then(res => res.json());
}
