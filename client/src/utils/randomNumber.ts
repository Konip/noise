export function randomNumber(obj: object) {
    let keys: number[] = Object.keys(obj).map(el => Number(el));
    let result : number = keys[keys.length * Math.random() << 0]
    return result
};