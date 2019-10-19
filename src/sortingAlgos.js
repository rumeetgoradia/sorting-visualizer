import { forInStatement } from "@babel/types"

export const mergeSort = (array, animations) => {
	if (array.length === 1) return array
	const mid = Math.floor(array.length / 2)
	const leftHalf = mergeSort(array.slice(0, mid))
	const rightHalf = mergeSort(array.slice(mid))
	const sorted = []
	let i = 0,
		j = 0
	while (i < leftHalf.length && j < rightHalf.length) {
		if (leftHalf[i] < rightHalf[j]) {
			sorted.push(leftHalf[i])
			++i
		} else {
			sorted.push(rightHalf[j])
			++j
		}
	}
	while (i < leftHalf.length) {
		sorted.push(leftHalf[i])
	}
	while (j < rightHalf.length) {
		sorted.push(rightHalf[j])
	}
	return sorted
}
