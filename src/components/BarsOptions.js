import React from "react"
import { useContext } from "react"
import { SortingContext } from "../context"
import GradientSelector from "./GradientSelector"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import Input from "@material-ui/core/Input"
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
		<section className="options-container">
			<div className="sliders">
				<div className="slider-group">
					{/* <Typography id="input-slider" gutterBottom>
						Array Size
					</Typography>
					<Grid container alignItems="center">
						<Grid item>
							<Slider
								value={parseInt(num_bars)}
								onChange={handleChange}
								aria-labelledby="input-slider"
								track={false}
							/>
						</Grid>
						<Grid item>
							<Input
								value={num_bars}
								margin="dense"
								onChange={handleChange}
								inputProps={{
									step: 4,
									min: { min_bars },
									max: { max_bars },
									type: "number",
									"aria-labelledby": "input-slider"
								}}
							/>
						</Grid>
					</Grid> */}
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
				<div className="slider-group">
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

			<div className="gradient-selector">
				<GradientSelector gradient={gradient} change={handleChange} />
			</div>
			<section className="algo-btns-container">
				<div className="algo-btns">
					<button className="algo-btn" onClick={bubbleSort}>
						Bubble Sort
					</button>
					<button className="algo-btn" onClick={insertionSort}>
						Insertion Sort
					</button>
					<button className="algo-btn" onClick={selectionSort}>
						Selection Sort
					</button>
				</div>
				<div className="algo-btns">
					<button className="algo-btn" onClick={heapSort}>
						Heap Sort
					</button>
					<button className="algo-btn" onClick={mergeSort}>
						Merge Sort
					</button>
					<button className="algo-btn" onClick={quickSort}>
						Quick Sort
					</button>
				</div>
			</section>
			<section className="gen-btn-container">
				<button onClick={generateArray}>Generate New Array</button>
			</section>
		</section>
	)
}
