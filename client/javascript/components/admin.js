class admin {
    render(users){
        const reducer = (acc, curUser) => {
            if (curUser.AUTHORITY >= 99) return acc;
            return acc + this.childTemplate(curUser);
          };
      
          const childHtml = users.reduce(reducer, '');
          return childHtml;
    }

    childTemplate(user){
        return `
              <tr>
                  <th>${user.ID}</th>
                  <td>${user.NAME}</td>
                  ${this.checkAuth(user.AUTHORITY, user.ID)}
              </tr>`;
     }

    checkAuth(adminNumber,userID){
        return `<td><input id="${userID}" type="checkbox" ${adminNumber >= 10 ? 'checked' : ''}/></td>`;
    }
}

export default admin;