export class Cache<T> {
	private readonly cache = {};

	promise(key: string, func: (resolve, reject) => void) {
		return new Promise((resolve, reject) => {
			var me = this,
				reslv = function() {
					me.cache[key] = arguments[0];
					resolve.apply(this, arguments);
				};

			this.cache[key] ? resolve(this.cache[key]) : func(reslv, reject);
		});
	}
}