import observable from '../src/observable.js';
import {fetchData} from '../src/util.js';

class boardModel extends observable{
    constructor(){
        super();
    }

    async update(func,data){
        if(func === "move"){
            this.moveInOtherColumn(data);
        }
    }
    
    async moveInOtherColumn(data){
        let card = await fetchData('/todo/moveCard','POST',data);
        
    }
}


export default boardModel;