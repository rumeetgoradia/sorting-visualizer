import React from "react"
import BarsDisplay from "./BarsDisplay"
import BarsOptions from "./BarsOptions"
import PortfolioLink from "./PortfolioLink"
import { withSortingConsumer } from "../context"

function SortingVisualizer({ context }) {
	const { arr, num_bars } = context
	return (
		<div>
			<BarsOptions />
			<BarsDisplay bars={arr} num_bars={num_bars} />
			<PortfolioLink />
		</div>
	)
}
export default withSortingConsumer(SortingVisualizer)
