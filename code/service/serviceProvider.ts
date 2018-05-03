import { Service, serviceProvider } from '../core/service';

/** @description Interface du service fournisseur de service.  
 */  
export abstract class IServiceProvider {

    /** @description Récupère une instance du service qui a pour interface le paramètre type.  
	 * @param {type} Class Interface du service à récupérer.
	 * @return L'instance du service dont l'interface est type.
	 */  
    abstract getService<T>(type: Function & { prototype: T; }): T;

    /** @description Récupère une instance du service qui a pour interface le paramètre type.  
	 * @param {type} Class Interface du service à récupérer.
	 * @return L'instance du service dont l'interface est type.
	 */  
    abstract getService<T>(type: Function & { prototype: T; }): T;

    /** @description Crée une nouvelle instance du service qui a pour interface le paramètre type.  
	 * @param {type} Class Interface du service à créer.
	 * @return L'instance du service dont l'interface est type.
	 */  
    abstract createService<T>(key: Function & { prototype: T }, parameters?: any[]): T;
}

@Service({
    key: IServiceProvider
})
export class ServiceProvider extends IServiceProvider {
    getService<T>(type: Function & { prototype: T; }): T {
        return serviceProvider.getService(type);
    }

    createService<T>(key: Function & { prototype: T }, parameters?: any[]): T {
        return serviceProvider.createService(key, parameters);
    }
}


