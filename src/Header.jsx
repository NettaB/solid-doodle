import React from "react";
import { CONNECTORS, SENTIMENTS } from "./consts";

const connectorReadableNames = {
	[CONNECTORS.FB]: "Facebook",
	[CONNECTORS.TW]: "Twitter",
	[CONNECTORS.IN]: "Instagram",
};

const Header = ({ handleConnectorToggle, handleSentimentToggle }) => {
	const setConnectors = (e) => {
		handleConnectorToggle(e.target.name, e.target.checked);
	};

	const setSentiments = (e) => {
		handleSentimentToggle(e.target.name, e.target.checked);
	};

	return (
		<header>
			<section>
				<h3>Filter by Source:</h3>
				<form name="connectors" onChange={setConnectors}>
					{Object.values(CONNECTORS).map((connectorName) => [
						<input
							type="checkbox"
							id={connectorName}
							name={connectorName}
							defaultChecked={true}
							key={connectorName}
						/>,
						<label
							htmlFor={connectorName}
							key={`${connectorName}-label`}
						>
							Show {connectorReadableNames[connectorName]}
						</label>,
					])}
				</form>
			</section>
			<section>
				<h3>Filter by Sentiment:</h3>
				<form name="sentiments" onChange={setSentiments}>
					{Object.values(SENTIMENTS).map((sentimentName) => [
						<input
							type="checkbox"
							id={sentimentName}
							name={sentimentName}
							defaultChecked={true}
							key={sentimentName}
						/>,
						<label
							htmlFor={sentimentName}
							key={`${sentimentName}-label`}
						>
							Show {sentimentName} Sentiment
						</label>,
					])}
				</form>
			</section>
		</header>
	);
};

export default Header;
