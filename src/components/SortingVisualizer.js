import React from "react"
import BarsDisplay from "./BarsDisplay"
import BarsOptions from "./BarsOptions"
import { withSortingConsumer } from "../context"

function SortingVisualizer({ context }) {
	console.log(context)
	const { loading, arr, arr_cols, arr_vals } = context
	return (
		<div>
			<BarsDisplay bars={arr} />
		</div>
	)
}
export default withSortingConsumer(SortingVisualizer)
