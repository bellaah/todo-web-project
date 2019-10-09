import Admin from '../components/admin.js';

const checkAdminListener = () => {
    let saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click",(evt)=>{
        fetch('/admin/updateAuth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode:"cors",
            body: JSON.stringify(matchIdAndCheckbox())
        });
    });
}

const matchIdAndCheckbox = () => {
    let idCheckboxList = [];
    let userList = document.querySelectorAll("tbody > tr");
    userList.forEach(elem => {
        let userElment = elem.querySelector("input");
        idCheckboxList.push({
           id : userElment.id,
           admin : userElment.checked ? 10 : 0
        })
    })
    return idCheckboxList;
}

(async() => {
    let users = await fetch('/admin/userList')
    .then((res) => {
        return res.json();
    })

    let admin = new Admin();
    document.querySelector(".user-table").innerHTML = admin.render(users);
    checkAdminListener();
})()