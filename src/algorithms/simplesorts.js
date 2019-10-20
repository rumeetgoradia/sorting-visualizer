import { lessThan, swap, complete } from "./helpers"

export function bubbleSort(arr, actions) {
	let n = arr.length
	for (let i = 0; i < n; ++i) {
		for (let j = 0; j < n - i - 1; ++j) {
			if (lessThan(arr, j + 1, j, actions)) {
				swap(arr, j, j + 1, actions)
			} else {
				actions.push([-1, j + 1, j])
			}
		}
	}
	complete(actions)
}

export function insertionSort(arr, actions) {
	let n = arr.length
	for (let i = 1; i < n; ++i) {
		for (let j = i; j > 0; --j) {
			if (lessThan(arr, j, j - 1, actions)) {
				swap(arr, j, j - 1, actions)
			} else {
				actions.push([-1, j, j - 1])
			}
		}
	}
	complete(actions)
}

export function selectionSort(arr, actions) {
	let n = arr.length
	for (let i = 0; i < n - 1; ++i) {
		let min = i
		for (let j = i; j < n; ++j) {
			if (lessThan(arr, j, min, actions)) {
				min = j
			} else {
				actions.push([-1, j, min])
			}
		}
		swap(arr, i, min, actions)
	}
	complete(actions)
}
