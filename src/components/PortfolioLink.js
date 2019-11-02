import React, { Component } from "react"
import "./styles/portfoliolink.css"

export default class PortfolioLink extends Component {
	render() {
		return (
			<div className="footer">
				created by&nbsp;
				<span className="link-container">
					<a href="https://www.rumeetgoradia.com/" className="link">
						Rumeet Goradia
					</a>
				</span>
			</div>
		)
	}
}
