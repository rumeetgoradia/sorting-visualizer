import React, { Component } from "react"
import "./styles/portfoliolink.css"

export default class PortfolioLink extends Component {
	render() {
		return (
			<div>
				<a href="https://www.rumeetgoradia.com/" className="link">
					<img
						src="../favicon.png"
						alt="Logo"
						className="logo"
						title="Created by Rumeet Goradia"
					/>
				</a>
			</div>
		)
	}
}
