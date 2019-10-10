import observable from '../src/observable.js';
import {fetchData} from '../src/util.js';

class boardModel extends observable{
    constructor(){
        super();
    }

    //moveInSameColumn,moveInOtherColumn
    async update(func,data){
        func === "moveInOtherColumn" ? this.moveInOtherColumn(data) : this.moveInSameColumn(data);
    }
    
    async moveInOtherColumn(data){
        let card = await fetchData('/todo/moveCard','POST',data);
        
    }

    async moveInSameColumn({cardId, orderIndex, columnId}){
        await fetchData('/todo/deleteCard','POST',{ cardId , orderIndex,columnId });
    }

}


export default boardModel;