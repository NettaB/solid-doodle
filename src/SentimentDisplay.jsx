import Chart from "react-google-charts";
import { SENTIMENTS } from "./consts";

const connectorDisplayNames = {
	fb: "Facebook",
	tw: "Twitter",
	in: "Instagram",
};

const SentimentDisplay = ({ currentLikes, delta, connector, sentiment }) => {
	return (
		<section className={`like-display ${connector}`}>
			<h1>{connectorDisplayNames[connector]}</h1>
			<section className="counter">
				<h2>{currentLikes ? currentLikes.toLocaleString() : ""}</h2>
				<p className="delta">{delta < 0 ? delta : `+${delta}`}</p>
			</section>
			{sentiment && (
				<Chart
					width={300}
					height={300}
					chartType="PieChart"
					loader={<div>Loading Chart</div>}
					data={[
						["sentiment", "engagements per week"],
						[
							SENTIMENTS.POSITIVE,
							Math.round(
								(sentiment.positive * currentLikes) / 100
							),
						],
						[
							SENTIMENTS.NEGATIVE,
							Math.round(
								(sentiment.negative * currentLikes) / 100
							),
						],
						[
							SENTIMENTS.NEUTRAL,
							Math.round(
								(sentiment.neutral * currentLikes) / 100
							),
						],
					]}
					options={{
						pieHole: 0.5,
						colors: ["#24d394", "#ff4b59", "#d8d8d8"],
						legend: "none",
						pieSliceTextStyle: {
							color: "#222222",
							fontSize: 14,
						},
						pieSliceText: "value",
					}}
				/>
			)}
		</section>
	);
};

export default SentimentDisplay;
