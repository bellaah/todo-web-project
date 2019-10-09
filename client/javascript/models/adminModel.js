import Admin from '../components/admin.js';
import {$,$$} from '../src/util.js';

const checkAdminListener = () => {
    let saveBtn = $(".save-btn");
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
    let userList = $$("tbody > tr");
    userList.forEach(elem => {
        let userElment = $("input");
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

    const admin = new Admin();
    $(".user-table").innerHTML = admin.render(users);
    checkAdminListener();
})()