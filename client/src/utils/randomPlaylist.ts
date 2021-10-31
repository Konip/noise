interface obj {
    [key: string]: number
}
export function randomPlalist(obj: obj) {

    let object: obj = {};
    let keys: string[] = Object.keys(obj);

    for (let i = 0; i < 3; i++) {
        let num: number = (keys.length * Math.random()) << 0;
        let word: string = keys[num];
        keys.splice(num, 1);
        let float: number = Number((Math.random() * (1 - 0) + 0).toFixed(2));
        object[word] = float;
    }

    return object;
}