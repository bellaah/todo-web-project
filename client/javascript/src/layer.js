const layerDiv =  document.querySelector(".pop_layer");
const backgroundDiv = document.querySelector("#backgound_div");
const layerHead =  document.querySelector("#layer_head");
const layerText = document.querySelector("#layer_text");
const layerBtnDiv = document.querySelector("#layer_btn");


const popLayer = () => {
    layerDiv.style.display = 'flex';
    backgroundDiv.style.display = 'inline';
    layerDiv.style.left = (window.innerWidth-layerDiv.clientWidth)/2+"px";
    layerDiv.style.top = (window.innerHeight-layerDiv.clientHeight)/2+"px";
    backgroundDiv.style.width = window.innerWidth+"px";
    backgroundDiv.style.height = window.innerHeight+"px";
}
 
const closeLayer = () => {
    layerDiv.style.display = 'none';
    backgroundDiv.style.display = 'none';
    layerText.removeAttribute("onscroll");
    removeChildAll(layerBtnDiv);
}

const resetLayer = () => {    
    layerText.style.height = '2rem';
    layerText.style.margin = '0.2rem 0 1rem 0';
    layerHead.innerHTML = "";
    layerText.innerHTML = "모든 내용을 새로 작성하시겠습니까?";

    layerBtnDiv.insertAdjacentHTML('beforeend',`<button type="button" onclick="closeLayer()" class="layer_green_btn">취소</button>`);
    layerBtnDiv.insertAdjacentHTML('beforeend',`<button type="button" onclick="customReset()" class="layer_green_btn">확인</button>`);
    popLayer();
}

const registerLayer = (list) =>{
    layerText.style.height = 'auto';
    layerText.style.margin = '0.2rem 0 1rem 0';
    let listText ="";
    layerHead.innerHTML = "";

    list.forEach(element => {
        listText += `${element}\n`;
    });
    layerText.innerHTML = listText;
    layerBtnDiv.insertAdjacentHTML('beforeend',`<button type="button" onclick="closeLayer()" class="layer_green_btn">확인</button>`);
    popLayer();
}
