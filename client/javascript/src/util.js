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

export {$,$$,findInParentX2,findInParent};