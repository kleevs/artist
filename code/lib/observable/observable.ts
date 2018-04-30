import { observable } from './core';

export function create<T>(): (value?: T) => T;
export function create<T>(value: T): (value?: T) => T; 		
export function create<T>(value?: T): (value?: T) => T {
	var result = value;
	var obj = observable(() => result);
	return function (value?: T) {
		arguments.length > 0 && (result = value);
		obj.apply(this);
		return result;
	};
}