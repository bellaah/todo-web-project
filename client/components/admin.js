class admin {
    render(list){
        let childHTML = "";
        list.forEach(obj => {
            if(obj.AUTHORITY < 99){
                childHTML += `
                <tr>
                    <th>${obj.ID}</th>
                    <td>${obj.NAME}</td>
                    ${this.isAdmin(obj.AUTHORITY,obj.ID)}
                </tr>
                `
            }
        });
        return childHTML;
    }

    isAdmin(adminNumber,userID){
        return adminNumber >= 10 ? `<td><input id="${userID}" type="checkbox" checked/></td>` 
        : `<td><input id="${userID}" type="checkbox"/></td>`;
    }
}

export default admin;