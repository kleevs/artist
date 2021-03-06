import '../reflection/index';

export abstract class IProvider {
    abstract createService<T>(key: Function & { prototype: T }): T;
    abstract createService<T>(key: Function & { prototype: T }, parameters: any[]): T;
    abstract createService<T>(key: Function & { prototype: T }, parameters?: any[]): T;
    abstract getService<T>(type: Function & { prototype: T }): T;
}

export abstract class IConfig {
    abstract addService<TKey, TValue extends TKey>(
		key: { prototype: TKey }, 
		value: (new (...arg) => TValue), 
		options: { 
			parameters: any[]; 
			registerable: boolean, 
			initialize: (instance: TKey) => void,
			test?: (serviceClass: any) => boolean
		}
	): void;
	
    abstract getService<TKey, TValue extends TKey>(key: { prototype: TKey }): { 
		value: (new (...arg) => TValue), 
		parameters: any[], 
		registerable: boolean, 
		initialize: (instance: any) => void 
	};
}

class Provider extends IProvider {
    private _register: { key: any, value: any }[];

    constructor(private _config: IConfig) {
        super();
        this._register = [];
    }

    private create<T>(data: { value: (new (...arg) => T), parameters: any[] }): T {
        var param = [];
        data && data.parameters && data.parameters.forEach((key) => {
            param.push(this.getService(key));
        });

	    return data.value ? 
			(param.length <= 0 ? 
				new data.value() : 
				new (data.value.bind.apply(data.value, [null].concat(param)))()
			): undefined;
    }

    createService<T>(key: Function & { prototype: T }): T;
    createService<T>(key: Function & { prototype: T }, parameters: any[]): T;
    createService<T>(key: Function & { prototype: T }, parameters?: any[]): T {
		let instance;
        let service = this._config.getService<T,T>(key);
        service = service || { value: key, parameters: [] } as any;
        parameters && (service.parameters = parameters);
        instance = this.create<T>(service);
		service && service.initialize && service.initialize(instance);
		return instance;
    }

    getService<T>(key: Function & { prototype: T }): T {
        var result = this._register.filter((item) => item.key === key).map((item) => item.value)[0];
        var registerable = !result && this._config.getService(key).registerable;
        result = result || this.createService(key);
        registerable && this._register.push({ key: key, value: result });
        return result;
    }
}

class Config extends IConfig {
    private _register: { 
		key: any, 
		value: any, 
		parameters: any[], 
		registerable: boolean, 
		initialize: (instance: any) => void,
		test?: (serviceClass: any) => boolean
	}[];

    constructor() {
        super();
        this._register = [];
    }

    addService<TKey, TValue extends TKey>(
		key: { prototype: TKey }, 
		value: (new (...arg) => any), 
		options: { 
			parameters: any[]; 
			registerable: boolean, 
			initialize: (instance: TKey) => void,
			test?: (serviceClass: any) => boolean
		}
	): void {
        this._register.unshift({ 
			key: key, 
			value: value, 
			parameters: options.parameters, 
			registerable: options.registerable, 
			initialize: options.initialize,
			test: options.test
		});
    }

    getService<TKey, TValue extends TKey>(key: { prototype: TKey }): { 
		value: (new (...arg) => any), 
		parameters: any[], 
		registerable: boolean, 
		initialize: (instance: any) => void 
	} {
        return this._register
			.filter((item) => item.key === key)
			.filter(item => !item.test || item.test(item.value))
			.map((item) => { 
				return { 
					value: item.value, 
					parameters: item.parameters, 
					registerable: item.registerable, 
					initialize: item.initialize 
				};
			})[0];
    }
}

export class DependencyInjector {
    private _config: IConfig;
    private _provider: IProvider;

    constructor() {
        this._config = new Config();
        this._provider = new Provider(this._config);
    }

    public getConfig(): IConfig { return this._config; }
    public getProvider(): IProvider { return this._provider; }
    public getDecorator() {
        return <TKey, TValue extends TKey>(options: { 
			key: { prototype: TKey }, 
			registerable?: boolean, 
			initialize?: (instance: TKey) => void,
			test?: (serviceClass: any) => boolean
		}): (target: (new (...arg) => TValue)) => void => {
            var res: any = (target: (new (...arg) => TValue), metadata) => { 
                this._config.addService(
					options.key, 
					target, 
					{ 
						parameters: metadata && metadata["design:paramtypes"] || [],
						registerable: options.registerable || options.registerable === undefined, 
						initialize: options.initialize,
						test: options.test
					});
            };
            
            return res;
        }
    }
}