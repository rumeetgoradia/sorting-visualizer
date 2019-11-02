import styled from "styled-components"
import { keyframes } from "styled-components"

export const GenerateButton = styled.button`
	position: relative;
	width: 60px;
	height: 60px;
	line-height: 1;
	font-size: 2rem;
	border-radius: 50%;
	color: var(--unfocused);
	transition: all 0.3s ease;
	background: #262626;
	font-family: "Open Sans Condensed", sans-serif;
	&:hover {
		color: var(--focused);
		cursor: pointer;
	}
	&:focus {
		outline: none;
	}
`

// const colorChange = keyframes`
// 	0% {
// 		background-position: 0%;
// 	}
// 	100% {
// 		background-position: 10000%;
// 	}
// `

// export const GenerateButton = styled.button`
// 	width: 60px;
// 	height: 60px;
// 	border-radius: 50%;
// 	font-size: 2rem;
// 	line-height: 1;
// 	border: 0px;

// 	text-align: center;
// 	background-size: 10000% !important;
// 	animation: ${colorChange} 2400s linear infinite;
// 	color: var(--unfocused);
// 	transition: all 0.3s ease;
// 	position: relative;
// 	background: linear-gradient(90deg, ${props => props.colors});
// 	&:hover {
// 		color: var(--focused);
// 		cursor: pointer;
// 	}
// 	&::before {
// 		content: "";
// 		top: -5px;
// 		left: -5px;
// 		right: -5px;
// 		bottom: -5px;
// 		z-index: -1;
// 		position: absolute;
// 		background: linear-gradient(90deg, ${props => props.colors});
// 		background-size: 10000% !important;
// 		border-radius: 50%;
// 		filter: blur(12px);
// 		animation: ${colorChange} 2400s linear infinite;
// 	}
// 	&:focus {
// 		outline: none;
// 	}
// `
