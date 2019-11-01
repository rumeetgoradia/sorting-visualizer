import React from "react"
import { useContext } from "react"
import { SortingContext } from "../context"
import GradientSelector from "./GradientSelector"
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

	// console.log(context)

	return (
		<div className="container-fluid">
			<section className="options-container row">
				<div className="slider-group col-2">
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
				<div className="slider-group col-2">
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
				{/* <div className="gradient-selector">
					<input
						type="radio"
						name="gradient"
						value="b92b271565C0"
						onChange={handleChange}
						checked={gradient === "b92b271565C0"}
						/>{" "}
						Evening Sunshine
						<input
						type="radio"
						name="gradient"
						value="076585eeeeee"
						onChange={handleChange}
						checked={gradient === "076585eeeeee"}
					/>{" "}
					Sky
					<input
					type="radio"
					name="gradient"
						value="fbc7d49796f0"
						onChange={handleChange}
						checked={gradient === "fbc7d49796f0"}
						/>{" "}
					Anamnisar
					<input
						type="radio"
						name="gradient"
						value="acb6e586fde8"
						onChange={handleChange}
						checked={gradient === "acb6e586fde8"}
						/>
					Windy
					<input
						type="radio"
						name="gradient"
						value="659999f4791f"
						onChange={handleChange}
						checked={gradient === "659999f4791f"}
						/>
						Metapolis
						<input
						type="radio"
						name="gradient"
						value="009FFFec2F4B"
						onChange={handleChange}
						checked={gradient === "009FFFec2F4B"}
						/>
					By Design
					<input
						type="radio"
						name="gradient"
						value="00F2600575E6"
						onChange={handleChange}
						checked={gradient === "00F2600575E6"}
						/>
						Rainbow Blue
					<input
					type="radio"
					name="gradient"
					value="22c1c3fdbb2d"
						onChange={handleChange}
						checked={gradient === "22c1c3fdbb2d"}
						/>
						Summer
					<input
					type="radio"
					name="gradient"
						value="C337641D2671"
						onChange={handleChange}
						checked={gradient === "C337641D2671"}
						/>
					Celestial
					<input
					type="radio"
						name="gradient"
						value="70e1f5ffd194"
						onChange={handleChange}
						checked={gradient === "70e1f5ffd194"}
						/>
					Shore
				</div> */}

				<div className="gradient-selector col-3">
					<GradientSelector gradient={gradient} change={handleChange} />
				</div>
				<section className="algo-btns-container col-4">
					<div className="algo-btns">
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
					<div className="algo-btns">
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
				<section className="gen-btn-container col-1">
					<button className="disable" onClick={generateArray}>
						Generate New Array
					</button>
				</section>
			</section>
		</div>
	)
}
