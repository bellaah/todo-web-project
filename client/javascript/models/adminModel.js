import Admin from '../components/admin.js';
import {$,$$,fetchData} from '../src/util.js';

const checkAdminListener = () => {
    let saveBtn = $(".save-btn");
    saveBtn.addEventListener("click",(evt) => {
        fetchData('/admin/updateAuth','POST',matchIdAndCheckbox());
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
    let users = await fetchData('/admin/userList',"GET");

    const admin = new Admin();
    $(".user-table").innerHTML = admin.render(users);
    checkAdminListener();
})()