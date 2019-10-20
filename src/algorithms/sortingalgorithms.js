import { lessThan, swap, complete, put } from "./helpers"

export function bubbleSort(arr, actions, reps) {
	let n = arr.length
	for (let i = 0; i < n; ++i) {
		for (let j = 0; j < n - i - 1; ++j) {
			if (lessThan(arr, j + 1, j, actions, reps)) {
				swap(arr, j, j + 1, actions, reps)
			} else {
				actions.push([-1, j + 1, j])
			}
		}
	}
	complete(actions)
}

export function insertionSort(arr, actions, reps) {
	let n = arr.length
	for (let i = 1; i < n; ++i) {
		for (let j = i; j > 0; --j) {
			if (lessThan(arr, j, j - 1, actions, reps)) {
				swap(arr, j, j - 1, actions, reps)
			} else {
				actions.push([-1, j, j - 1])
			}
		}
	}
	complete(actions)
}

export function selectionSort(arr, actions, reps) {
	let n = arr.length
	for (let i = 0; i < n - 1; ++i) {
		let min = i
		for (let j = i; j < n; ++j) {
			if (lessThan(arr, j, min, actions, reps)) {
				actions.push([-1, min, j])
				min = j
			} else {
				actions.push([-1, j, min])
			}
		}
		swap(arr, i, min, actions, reps)
	}
	complete(actions)
}

export function heapSort(arr, left, right, actions, reps) {
	left = left || 0
	right = right || arr.length - 1
	let n = right - left + 1
	let start = Math.floor(n / 2) - 1 + left
	function sift_down(start, end) {
		let base = start
		while (true) {
			let left_child = 2 * (base - left) + 1 + left
			let right_child = 2 * (base - left) + 2 + left
			if (left_child > end) {
				break
			}
			let swapNum = base
			if (lessThan(arr, swapNum, left_child, actions, reps)) {
				actions.push([-1, left_child, swapNum])
				swapNum = left_child
			} else {
				actions.push([-1, swapNum, left_child])
			}
			if (
				right_child <= end &&
				lessThan(arr, swapNum, right_child, actions, reps)
			) {
				actions.push([-1, right_child, swapNum])
				swapNum = right_child
			} else if (right_child <= end) {
				actions.push([-1, swapNum, right_child])
			}
			if (swapNum === base) {
				return
			}
			swap(arr, base, swapNum, actions, reps)
			base = swapNum
		}
	}
	while (start >= left) {
		sift_down(start, right)
		--start
	}
	let end = right
	while (end > left) {
		swap(arr, end, left, actions, reps)
		--end
		sift_down(left, end)
	}
	complete(actions)
}

export function mergeSort(arr, actions, reps) {
	if (arr.length <= 1) return
	const auxArray = arr.slice()
	mergePartition(arr, 0, arr.length - 1, auxArray, actions, reps)
}

function mergePartition(mainArr, start, end, auxArray, actions, reps) {
	if (start === end) return
	const mid = Math.floor((start + end) / 2)
	mergePartition(auxArray, start, mid, mainArr, actions, reps)
	mergePartition(auxArray, mid + 1, end, mainArr, actions, reps)
	mergeAction(mainArr, start, mid, end, auxArray, actions, reps)
}

function mergeAction(mainArr, start, mid, end, auxArray, actions, reps) {
	let k = start,
		i = start,
		j = mid + 1
	while (i <= mid && j <= end) {
		if (lessThan(auxArray, i, j, actions, reps)) {
			actions.push([-1, j, i])
			put(k, auxArray[i], actions, reps)
			mainArr[k] = auxArray[i]
			++k
			++i
		} else {
			actions.push([-1, j, i])
			put(k, auxArray[j], actions, reps)
			mainArr[k] = auxArray[j]
			++k
			++j
		}
	}
	while (i <= mid) {
		lessThan(auxArray, i, i, actions, reps)
		actions.push([-1, i, i])
		put(k, auxArray[i], actions, reps)
		mainArr[k] = auxArray[i]
		++k
		++i
	}
	while (j <= end) {
		lessThan(auxArray, j, j, actions, reps)
		actions.push([-1, j, j])
		put(k, auxArray[j], actions, reps)
		mainArr[k] = auxArray[j]
		++k
		++j
	}
}
