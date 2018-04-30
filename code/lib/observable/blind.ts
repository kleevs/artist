import { blind } from './core';

export function create<T>(fn: ()=>T): void {
	return blind(fn);
}