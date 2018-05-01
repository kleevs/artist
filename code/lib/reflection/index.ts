var context: Window & { Reflect: { metadata: (k: string, v: any[]) => any, decorate: (decorators, target, key, desc) => any } } = window as any;
context.Reflect = context.Reflect || <any>{}; 
context.Reflect.metadata = (k, v) => {
    return (target, metadata) => {
        metadata[k] = v;
    };
};

context.Reflect.decorate = (decorators, target, key, desc) => {
    var r = key === undefined ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, 
        metadata = {},
        d;

    for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) {
            r = (!key ? d(r, metadata) : !desc ? d(target, key, r, metadata) : d(target, key, metadata)) || r;
        }
    }

    return r;
};

export default true;