import React from "react"
import "./styles/sortingvisualizer.css"

export default function BarsDisplay({ bars }) {
	return (
		<section className="bars-container" id="bars-container">
			{bars.map((item, index) => {
				return (
					<div
						key={index}
						style={{
							height: `${item.val}px`,
							backgroundColor: `${item.color}`
						}}
						className="bar"
					></div>
				)
			})}
		</section>
	)
}
