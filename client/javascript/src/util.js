const $ = (name) => {
    return document.querySelector(name);
}

const $$ = (name) => {
    return document.querySelectorAll(name);
}

const findInParentX2 = (target,name) => {
    return target.parentNode.parentNode.querySelector(name);
}

const findInParent = (target,name) => {
    return target.parentNode.querySelector(name);
}

const fetchData = async(url,method,body) => {
    if(method === "GET"){
        return await fetch(url).then(res => res.json());
    }else{
        return await fetch(url, {
            method ,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json());
    }
}

export {$,$$,findInParentX2,findInParent,fetchData};