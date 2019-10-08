let list;

const itemRender = (list) => {
    let childHTML = "";
    list.forEach(obj => {
        if(obj.AUTHORITY < 99){
            childHTML += `
            <tr>
                <th>${obj.ID}</th>
                <td>${obj.NAME}</td>
                ${isAdmin(obj.AUTHORITY,obj.ID)}
            </tr>
            `
        }
    });
    return childHTML;
}

const isAdmin = (adminNumber,userID) => {
    return adminNumber >= 10 ? `<td><input id="${userID}" type="checkbox" checked/></td>` 
    : `<td><input id="${userID}" type="checkbox"/></td>`;
}

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
    list = await fetch('/admin/userList')
    .then((res) => {
        return res.json();
    })

    document.querySelector(".user-table").innerHTML = itemRender(list);
    checkAdminListener();
})()
