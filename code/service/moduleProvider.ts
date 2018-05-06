import { Service } from '../core/service';
import { load } from 'node_modules/amd-loader/src/index';

export abstract class IModuleProvider {
    abstract get(uri: string): Promise<any>;
}

@Service({
    key: IModuleProvider
})
export class ModuleProvider extends IModuleProvider {
    constructor() {
        super();
    }

    get(uri: string) {
        return load(`/${uri}`);
    }
}