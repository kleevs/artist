import { observer } from './core';

export function create<T>(fn: ()=>T): void {
	return observer(fn);
}