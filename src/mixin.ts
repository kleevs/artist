export function foreach<T>(item, callback) {
    let i;
    if (item instanceof Array) {
        for (i=0; i<item.length;i++) {
            callback(item[i], i);
        }
    } else {
        for (i in item) {
            callback(item[i], i);
        }
    }
}

export function map<T, T2>(array: T[], parse: (item: T)=>T2): T2[] {
    let res = [];
    foreach(array, (x) => { res.push(parse(x)); return false; });
    return  res;
}

export function grep<T>(array: T[], predicate: (item: T, index: number)=>boolean): T[] {
    let i, res = [];
    for (i=0; i<array.length;i++) {
        if (predicate(array[i], i)) res.push(array[i]);
    }

    return res;
}