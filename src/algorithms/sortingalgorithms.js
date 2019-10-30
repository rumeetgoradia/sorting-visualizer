import { lessThan, swap, complete, put, randomInt } from "./helpers"

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
	for (let i = 0; i < arr.length - 1; ++i) {
		actions.push([-1, i + 1, i])
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
				break
			}
		}
	}
	for (let i = 0; i < arr.length - 1; ++i) {
		actions.push([-1, i + 1, i])
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
	for (let i = 0; i < arr.length - 1; ++i) {
		actions.push([-1, i + 1, i])
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
	for (let i = 0; i < arr.length - 1; ++i) {
		actions.push([-1, i + 1, i])
	}
	complete(actions)
}

export function mergeSort(arr, arrCols, actions, reps) {
	if (arr.length <= 1) return
	const auxArray = arr.slice()
	const auxArrayCols = arrCols.slice()
	mergePartition(
		arr,
		arrCols,
		0,
		arr.length - 1,
		auxArray,
		auxArrayCols,
		actions,
		reps
	)
	for (let i = 0; i < arr.length - 1; ++i) {
		actions.push([-1, i + 1, i])
	}
	complete(actions)
}

function mergePartition(
	mainArr,
	arrCols,
	start,
	end,
	auxArray,
	auxArrayCols,
	actions,
	reps
) {
	if (start === end) return
	const mid = Math.floor((start + end) / 2)
	mergePartition(
		auxArray,
		auxArrayCols,
		start,
		mid,
		mainArr,
		arrCols,
		actions,
		reps
	)
	mergePartition(
		auxArray,
		auxArrayCols,
		mid + 1,
		end,
		mainArr,
		arrCols,
		actions,
		reps
	)
	mergeAction(
		mainArr,
		arrCols,
		start,
		mid,
		end,
		auxArray,
		auxArrayCols,
		actions,
		reps
	)
}

function mergeAction(
	mainArr,
	arrCols,
	start,
	mid,
	end,
	auxArray,
	auxArrayCols,
	actions,
	reps
) {
	let k = start,
		i = start,
		j = mid + 1
	while (i <= mid && j <= end) {
		// console.log("mid is " + mid + "and j is " + j)
		let check = lessThan(auxArray, i, j, actions, reps)
		actions.push([-1, j, i])
		if (check) {
			put(k, auxArray[i], auxArrayCols[i], actions, reps)
			mainArr[k] = auxArray[i]
			arrCols[k] = auxArrayCols[i]
			++k
			++i
		} else {
			put(k, auxArray[j], auxArrayCols[j], actions, reps)
			mainArr[k] = auxArray[j]
			arrCols[k] = auxArrayCols[j]
			++k
			++j
		}

		// console.log(arrCols, mainArr)
	}
	while (i <= mid) {
		// lessThan(auxArray, i, i, actions, reps)
		// actions.push([-1, i, i])
		put(k, auxArray[i], auxArrayCols[i], actions, reps)
		mainArr[k] = auxArray[i]
		arrCols[k] = auxArrayCols[i]
		++k
		++i
		// console.log(arrCols, mainArr)
	}
	while (j <= end) {
		// lessThan(auxArray, j, j, actions, reps)
		// actions.push([-1, j, j])
		put(k, auxArray[j], auxArrayCols[j], actions, reps)
		mainArr[k] = auxArray[j]
		arrCols[k] = auxArrayCols[j]
		++k
		++j
		// console.log(arrCols, mainArr)
	}
}

export function quickSort(arr, left, right, actions, reps) {
	if (left >= right) {
		return
	}
	let pivot = partition(arr, left, right, actions, reps)
	quickSort(arr, left, pivot - 1, actions, reps)
	quickSort(arr, pivot + 1, right, actions, reps)
	for (let i = 0; i < arr.length - 1; ++i) {
		actions.push([-1, i + 1, i])
	}
}

function partition(arr, left, right, actions, reps) {
	let pivot = randomInt(left, right)
	swap(arr, pivot, right, actions, reps)
	pivot = left
	for (let i = left; i < right; ++i) {
		if (lessThan(arr, i, right, actions, reps)) {
			if (i !== pivot) {
				swap(arr, i, pivot, actions, reps)
			} else {
				actions.push([-1, right, i])
			}
			++pivot
		} else {
			actions.push([-1, i, right])
		}
	}
	swap(arr, right, pivot, actions, reps)
	return pivot
}
