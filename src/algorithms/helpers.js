export function lessThan(arr, x, y, actions) {
	actions.push([0, x, y])
	return arr[x] < arr[y]
}

export function swap(arr, x, y, actions) {
	actions.push([1, x, y])
	const temp = arr[x]
	arr[x] = arr[y]
	arr[y] = temp
	actions.push([2, x, y])
	// actions.push([2, x, y])
}

export function complete(actions) {
	actions.push([5, 0, 0])
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
