import React from "react"
import { useContext } from "react"
import { SortingContext } from "../context"

export default function BarsOptions() {
	const context = useContext(SortingContext)
	const {
		generateArray,
		bubbleSort,
		insertionSort,
		selectionSort,
		heapSort,
		mergeSort,
		quickSort
	} = context

	return <div></div>
}
