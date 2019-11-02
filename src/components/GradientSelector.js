import React, { Component } from "react"
import gradientsList from "../gradients.json"
// import { IoIosArrowDown } from "react-icons/io"
import "./styles/gradientselector.css"

export default class GradientSelector extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gradient_name: "",
			color1: "",
			color2: "",
			dropdownVisible: false
		}
		this.showDropdown = this.showDropdown.bind(this)
		this.handleOutsideClick = this.handleOutsideClick.bind(this)
	}

	componentDidMount() {
		this.updateState(this.props.gradient)

		document.addEventListener("mousedown", this.handleClick, false)
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClick, false)
	}

	updateState = gradient => {
		const color1 = `#${gradient.substr(0, 6)}`
		const color2 = `#${gradient.substr(6, 6)}`

		for (let i = 0; i < gradientsList.length; ++i) {
			const gradientTemp = gradientsList[i]

			if (gradientTemp.color1 === color1 && gradientTemp.color2 === color2) {
				const gradient_name = gradientTemp.name
				this.setState({ gradient_name, color1, color2 })

				return
			}
		}
	}

	handleChange = event => {
		this.props.change(event)
		this.updateState(event.target.value)
	}

	showDropdown = () => {
		document.getElementById("dropdown").classList.toggle("show")

		document.getElementById("gradient-btn").classList.toggle("dropIsShown")
		if (!this.state.dropdownVisible) {
			// attach/remove event handler
			document.addEventListener("click", this.handleOutsideClick, false)
		} else {
			document.removeEventListener("click", this.handleOutsideClick, false)
		}

		this.setState(prevState => ({
			dropdownVisible: !prevState.dropdownVisible
		}))
	}

	handleOutsideClick(e) {
		// ignore clicks on the component itself
		if (this.node.contains(e.target)) {
			return
		}

		this.showDropdown()
	}

	// handleClick = event => {
	// 	console.log(event)
	// 	if (this.node.contains(event.target)) {
	// 		return
	// 	}
	// 	document.getElementById("dropdown").classList.toggle("show")
	// 	document.getElementById("gradient-btn").classList.toggle("dropIsShown")
	// }

	render() {
		return (
			<section
				className="gradient-selector-container"
				ref={node => (this.node = node)}
			>
				<div className="gradient-selector-wrapper disableDiv">
					<button
						className="gradient-selector-btn disable"
						style={{
							background: `linear-gradient(to right, ${this.state.color1}, ${this.state.color2})`
						}}
						onClick={this.showDropdown}
						id="gradient-btn"
					>
						<div className="col-12">
							<h3>Gradient</h3>
							<h4>{this.state.gradient_name}</h4>
						</div>
					</button>
					<div
						className="gradient-dropdown-list fadeIn"
						id="dropdown"
						style={{
							background: `linear-gradient(to right, ${this.state.color1}, ${this.state.color2})`
						}}
					>
						{gradientsList.map((item, index) => {
							return (
								<div className="gradient-dropdown-option" key={index}>
									<input
										type="radio"
										name="gradient"
										id={item.name}
										value={item.color1.substr(1, 6) + item.color2.substr(1, 6)}
										onChange={this.handleChange}
										checked={
											this.props.gradient ===
											item.color1.substr(1, 6) + item.color2.substr(1, 6)
										}
									/>
									<label
										htmlFor={item.name}
										style={{
											background: `linear-gradient(to right, ${item.color1}, ${item.color2})`
										}}
									>
										{item.name}
									</label>
								</div>
							)
						})}
					</div>
				</div>
			</section>
		)
	}
}
