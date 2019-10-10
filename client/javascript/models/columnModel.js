import observable from '../src/observable.js';
import {fetchData} from '../src/util.js';

class columnModel extends observable{
    constructor(){
        super();
    }

    async update(func,data){
        func === "addCard" ? this.addCard(data) : this.deleteCard(data);
    }
    
    async addCard({content,listId}){
        let card = await fetchData('/todo/addCard','POST',{ content, listId });
        this.changeState("addCard",card);
    }

    async deleteCard({cardId, orderIndex, columnId}){
        await fetchData('/todo/deleteCard','POST',{ cardId , orderIndex,columnId });
    }

}


export default columnModel;