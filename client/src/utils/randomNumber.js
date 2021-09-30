export function randomNumber(obj) {
    let keys = Object.keys(obj);
    // return obj[keys[keys.length * Math.random() << 0]];
    return keys[keys.length * Math.random() << 0]
};