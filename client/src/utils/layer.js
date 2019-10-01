const layerDiv =  document.querySelector(".pop_layer");
const backgroundDiv =  document.querySelector("#backgound_div");
const layerHead =  document.querySelector("#layer_head");
const layerText =  document.querySelector("#layer_text");
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

const termsLayer = () =>{
    layerText.style.height = '7rem';
    layerText.style.margin = '1rem 0;';
    layerText.setAttribute("onscroll","scrolled(this)");
    layerHead.innerHTML = "개인 정보 수집 및 이용에 대한 안내";
    layerText.innerHTML = `
정보통신망법 규정에 따라 부스트캠프에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.

1. 수집하는 개인정보의 항목
최초 회원가입 당시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
- 필수항목 : 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일, 휴대전화, 관심사

2. 개인정보의 수집 및 이용 목적
가. 컨텐츠 제공, 특정 맞춤 서비스 제공
나. 회원제 서비스 제공, 개인식별, 부스트캠프 이용약관 위반 회원에 대한 이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위 제재

3. 개인정보의 보유 및 이용기간
이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

가. 회사 내부 방침에 의한 정보보유 사유
- 부정이용기록(부정가입, 징계기록 등의 비정상적 서비스 이용기록)
보존 항목 : 가입인증 휴대폰 번호
보존 이유 : 부정 가입 및 이용 방지
보존 기간 : 6개월
※ '부정이용기록'이란 부정 가입 및 운영원칙에 위배되는 게시글 작성 등으로 인해 회사로부터 이용제한 등을 당한 기록입니다.

나. 관련법령에 의한 정보보유 사유
상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다. 

- 계약 또는 청약철회 등에 관한 기록
보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
보존 기간 : 5년

- 소비자의 불만 또는 분쟁처리에 관한 기록
보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
보존 기간 : 3년

- 웹사이트 방문기록
보존 이유 : 통신비밀보호법
보존 기간 : 3개월`;
    layerBtnDiv.insertAdjacentHTML('beforeend',`<button type="button" onclick="termsAgree()" class="layer_green_btn" disabled="true">동의</button>`);
    popLayer(layerBtnDiv);
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
