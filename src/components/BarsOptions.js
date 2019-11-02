import React from "react"
import { useContext } from "react"
import { SortingContext } from "../context"
import GradientSelector from "./GradientSelector"
import { MdAutorenew } from "react-icons/md"
import { GenerateButton } from "./styles/GenerateButton"
import "./styles/barsoptions.css"

export default function BarsOptions() {
	const context = useContext(SortingContext)
	const {
		generateArray,
		bubbleSort,
		insertionSort,
		selectionSort,
		heapSort,
		mergeSort,
		quickSort,
		handleChange,
		max_bars,
		min_bars,
		num_bars,
		max_speed,
		min_speed,
		speed,
		gradient
	} = context

	// let colors = ""

	// for (let i = 0; i < gradientsList.length; ++i) {
	// 	colors += gradientsList[i].color1 + ", "
	// 	if (i !== gradientsList.length - 1) {
	// 		colors += gradientsList[i].color2 + ", "
	// 	} else {
	// 		colors += gradientsList[i].color2 + ", " + gradientsList[0].color1
	// 	}
	// }

	// console.log(colors)

	// console.log(context)

	return (
		<div className="container-fluid">
			<section className="options-container row">
				<section className="gen-btn-container col-1">
					<GenerateButton
						// colors={colors}
						onClick={generateArray}
						className="disable"
					>
						<MdAutorenew />
					</GenerateButton>
				</section>
				<div className="slider-group col-2 disableDiv">
					<label htmlFor="num_bars" className="slider-label">
						Array Size
					</label>
					<input
						type="range"
						name="num_bars"
						min={min_bars}
						max={max_bars}
						id="num_bars"
						value={num_bars}
						onChange={handleChange}
						className="slider disable"
					/>

					<h6 className="slider-value">{num_bars} elements</h6>
				</div>
				<div className="slider-group col-2 disableDiv">
					<label htmlFor="num_bars" className="slider-label">
						Sorting Speed
					</label>
					<input
						type="range"
						name="speed"
						min={min_speed}
						max={max_speed}
						id="speed"
						value={speed}
						onChange={handleChange}
						className="slider reverse-slider disable"
					/>

					<h6 className="slider-value">{speed} ms per step</h6>
				</div>
				<div className="gradient-selector col-3">
					<GradientSelector gradient={gradient} change={handleChange} />
				</div>
				<section className="algo-btns-container col-4">
					<div className="algo-btns" style={{ marginBottom: ".5rem" }}>
						<button className="algo-btn disable" onClick={bubbleSort}>
							Bubble Sort
						</button>
						<button className="algo-btn disable" onClick={insertionSort}>
							Insertion Sort
						</button>
						<button className="algo-btn disable" onClick={selectionSort}>
							Selection Sort
						</button>
					</div>
					<div className="algo-btns" style={{ marginTop: ".5rem" }}>
						<button className="algo-btn disable" onClick={heapSort}>
							Heap Sort
						</button>
						<button className="algo-btn disable" onClick={mergeSort}>
							Merge Sort
						</button>
						<button className="algo-btn disable" onClick={quickSort}>
							Quick Sort
						</button>
					</div>
				</section>
			</section>
		</div>
	)
}
