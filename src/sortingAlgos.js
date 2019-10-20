export function getMergeSortAnimations(array) {
	const animations = []
	if (array.length <= 1) return array
	const auxiliaryArray = array.slice()
	mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations)
	return animations
}

function mergeSortHelper(
	mainArray,
	startIdx,
	endIdx,
	auxiliaryArray,
	animations
) {
	if (startIdx === endIdx) return
	const middleIdx = Math.floor((startIdx + endIdx) / 2)
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations)
	mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations)
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations)
}

function doMerge(
	mainArray,
	startIdx,
	middleIdx,
	endIdx,
	auxiliaryArray,
	animations
) {
	let k = startIdx
	let i = startIdx
	let j = middleIdx + 1
	while (i <= middleIdx && j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([i, j])
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([i, j])
		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			// We overwrite the value at index k in the original array with the
			// value at index i in the auxiliary array.
			animations.push([k, auxiliaryArray[i]])
			mainArray[k++] = auxiliaryArray[i++]
		} else {
			// We overwrite the value at index k in the original array with the
			// value at index j in the auxiliary array.
			animations.push([k, auxiliaryArray[j]])
			mainArray[k++] = auxiliaryArray[j++]
		}
	}
	while (i <= middleIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([i, i])
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([i, i])
		// We overwrite the value at index k in the original array with the
		// value at index i in the auxiliary array.
		animations.push([k, auxiliaryArray[i]])
		mainArray[k++] = auxiliaryArray[i++]
	}
	while (j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([j, j])
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([j, j])
		// We overwrite the value at index k in the original array with the
		// value at index j in the auxiliary array.
		animations.push([k, auxiliaryArray[j]])
		mainArray[k++] = auxiliaryArray[j++]
	}
}

export function getQuickSortAnimations(array) {
	const animations = []
	if (array.length <= 1) return array
	const auxArray = array.slice()
	quickSortHelper(array, 0, array.length - 1, auxArray, animations)

	return animations
}

function quickSortHelper(array, startIdx, endIdx, auxArray, animations) {
	if (startIdx < endIdx) {
		let part = partition_r(array, startIdx, endIdx, auxArray, animations)
		quickSortHelper(auxArray, part - 1, endIdx, array, animations)
		quickSortHelper(auxArray, part + 1, endIdx, array, animations)
	}
}

function partition_r(array, startIdx, endIdx, auxArray, animations) {
	const pivot = randomInt(startIdx, endIdx)
	console.log("back from randomint, generated pivot = " + pivot)
	// Revealing pivot
	animations.push([pivot, -1])
	console.log("pushed")
	// Swapping pivot and endIdx
	animations.push([pivot, endIdx])
	let temp = auxArray[pivot]
	auxArray[pivot] = auxArray[endIdx]
	auxArray[endIdx] = temp
	return partition(array, startIdx, endIdx, auxArray, animations)
}

function partition(array, startIdx, endIdx, auxArray, animations) {
	const pivot = array[endIdx]
	let ptr = startIdx
	for (let j = startIdx; j < endIdx; ++j) {
		// Comparing j and pivot
		animations.push([j, pivot])
		if (auxArray[j] <= pivot) {
			// Swapping i and j
			animations.push([j, auxArray[ptr]])
			let temp = auxArray[j]
			auxArray[j] = auxArray[ptr]
			auxArray[ptr] = temp
			++ptr
		}
	}
	// Swapping i and endIdx
	animations.push([ptr, endIdx])
	let temp = auxArray[ptr]
	auxArray[ptr] = auxArray[endIdx]
	auxArray[endIdx] = temp
	return ptr
}
