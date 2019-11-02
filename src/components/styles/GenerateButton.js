import styled from "styled-components"

export const GenerateButton = styled.button`
	position: relative;
	width: 60px;
	height: 60px;
	line-height: 1;
	font-size: 2rem;
	border-radius: 50%;
	border: 4px solid var(--unfocused);
	color: var(--unfocused);
	transition: all 0.3s ease;
	background: #262626;
	font-family: "Open Sans Condensed", sans-serif;
	box-shadow: inset 0 0 30px rgba(0, 0, 0, 1);
	overflow: hidden;
	.icon {
		transition: all 0.5s ease;
		color: var(--unfocused);
	}
	&:hover {
		color: var(--focused);
		cursor: pointer;
		border-color: var(--focused);
		.icon {
			transform: scale(1.1);
			color: var(--focused);
		}
	}
	&:focus {
		outline: none;
	}
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: -10px;
		width: 70%;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		transition: 0.5s ease-in-out;
		transform: skewX(-15deg);
	}
	&:hover:before {
		left: 90px;
	}
	&:after {
		content: "";
		position: absolute;
		top: 0;
		left: -25px;
		width: 25px;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		transition: 0.5s ease-in-out;
		transform: skewX(-15deg);
		transition-delay: 0.3s;
	}
	&:hover:after {
		left: 90px;
	}
`
