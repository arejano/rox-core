
export default class ESCIterator<T> {

	private end = false;

	private cache: T[] = [];

	private next: (i: number) => T | void;

	constructor(next: (i: number) => T | void) {
		this.next = next;
	}

	/**
	 * Allows iterate across all items
	 *
	 * @param cb
	 */
	each(cb: (item: T) => boolean | void) {
		let index = 0;
		while (true) {
			let value;
			if (this.cache.length <= index) {
				if (this.end) {
					break;
				}

				value = this.next(index++);
				if (value === undefined) {
					this.end = true;
					break;
				}
				this.cache.push(value);
			} else {
				value = this.cache[index++];
			}

			if (cb(value) === false) {
				break;
			}
		}
	}

	/**
	 * returns the value of the first element that satisfies the provided testing function.
	 *
	 * @param test
	 */
	find(test: (item: T) => boolean): T | undefined {
		let out = undefined;
		this.each((item) => {
			if (test(item)) {
				out = item;
				// break
				return false
			}
		});
		return out;
	}

	/**
	 * creates a array with all elements that pass the test implemented by the provided function.
	 *
	 * @param test
	 */
	filter(test: (item: T) => boolean): T[] {
		let list: T[] = [];
		this.each((item) => {
			if (test(item)) {
				list.push(item);
			}
		});
		return list;
	}

	/**
	 * creates a new array with the results of calling a provided function on every element in this iterator.
	 *
	 * @param cb
	 */
	map<P>(cb: (item: T) => P): P[] {
		let list: P[] = [];
		this.each((item) => {
			list.push(cb(item));
		});
		return list;
	}
}
