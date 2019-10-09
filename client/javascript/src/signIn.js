const isUser = async() => {
    const idInput = document.querySelector("#login_id_input");
    const pwdInput = document.querySelector("#login_pwd_input");
    const errorMsg = document.querySelector("#red_text");

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
