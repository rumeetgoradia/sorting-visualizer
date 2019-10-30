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

	// console.log(context)

	return (
		<section className="options-container">
			<form className="options-form">
				<div className="form-group">
					<label htmlFor="num_bars">Array Size</label>
					<input
						type="range"
						name="num_bars"
						min={min_bars}
						max={max_bars}
						id="num_bars"
						value={num_bars}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="num_bars">Sorting Duration</label>
					<input
						type="range"
						name="speed"
						min={min_speed}
						max={max_speed}
						id="speed"
						value={speed}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="gradient-selector">
					<input
						type="radio"
						name="gradient"
						value="b92b271565C0"
						onChange={handleChange}
						checked={gradient === "b92b271565C0"}
					/>
					<input
						type="radio"
						name="gradient"
						value="076585eeeeee"
						onChange={handleChange}
						checked={gradient === "076585eeeeee"}
					/>
					<input
						type="radio"
						name="gradient"
						value="fbc7d49796f0"
						onChange={handleChange}
						checked={gradient === "fbc7d49796f0"}
					/>
					<input
						type="radio"
						name="gradient"
						value="acb6e586fde8"
						onChange={handleChange}
						checked={gradient === "acb6e586fde8"}
					/>{" "}
					Windy
				</div>
			</form>
			<section className="algo-btns">
				<button onClick={bubbleSort}>Bubble Sort</button>
				<button onClick={insertionSort}>Insertion Sort</button>
				<button onClick={selectionSort}>Selection Sort</button>
				<button onClick={heapSort}>Heap Sort</button>
				<button onClick={mergeSort}>Merge Sort</button>
				<button onClick={quickSort}>Quick Sort</button>
			</section>
			<button onClick={generateArray}>Generate New Array</button>
		</section>
	)
}
