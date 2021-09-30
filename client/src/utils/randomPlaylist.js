export function randomPlalist(obj) {
    let object = {};
    let keys = Object.keys(obj);

    for (let i = 0; i < 3; i++) {
        let num = (keys.length * Math.random()) << 0;
        let word = keys[num];
        keys.splice(num, 1);
        let float = Number((Math.random() * (1 - 0) + 0).toFixed(2));
        object[word] = float;
    }
    return object;
}