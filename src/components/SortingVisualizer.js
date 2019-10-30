import React from "react"
import BarsDisplay from "./BarsDisplay"
import BarsOptions from "./BarsOptions"
import { withSortingConsumer } from "../context"

function SortingVisualizer({ context }) {
	const { arr } = context
	return (
		<div>
			<BarsOptions />
			<BarsDisplay bars={arr} />
		</div>
	)
}
export default withSortingConsumer(SortingVisualizer)
