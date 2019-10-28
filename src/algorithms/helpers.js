export function lessThan(arr, x, y, actions, reps) {
	for (let i = 0; i < reps; ++i) {
		actions.push([0, x, y])
	}
	return arr[x] < arr[y]
}

export function swap(arr, x, y, actions, reps) {
	for (let i = 0; i < reps; ++i) {
		actions.push([1, x, y])
	}
	const temp = arr[x]
	arr[x] = arr[y]
	arr[y] = temp
	actions.push([2, x, y])
	// actions.push([2, x, y])
}

export function put(x, height, color, actions, reps) {
	actions.push([3, x, height])
	// for (let i = 1; i < reps / 2; ++i) {
	// 	actions.push([3, x, height])
	// }
	actions.push([4, x, height])
	actions.push([5, x, height])
}

export function complete(actions) {
	actions.push([6, 0, 0])
}

export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
