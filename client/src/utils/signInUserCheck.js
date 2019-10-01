const isUser = () => {
    const idInput = document.querySelector("#login_id_input");
    const pwdInput = document.querySelector("#login_pwd_input");
    const errorMsg = document.querySelector("#red_text");

    axios({
        method: 'post',
        url: '/user/signIn',
        data: {
          id: idInput.value,
          password: pwdInput.value
        }
    }).then(res => {
        if(res.data){
            errorMsg.style.display = 'none';
            axios({
                method: 'post',
                url: '/insertSession',
                data: {
                  id : idInput.value
                }
            });
            window.location.href = '/';
        }else{
            errorMsg.style.display = 'inline';
        }
    }).catch(error => {
        console.log(error);
    });
}
