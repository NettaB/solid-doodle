import SentimentDisplay from "./SentimentDisplay";
import { CONNECTORS } from "./consts";

const Sentiments = ({ fbData, twData, inData }) => {
	return (
		<main className="sentiments">
			{fbData && (
				<SentimentDisplay {...fbData} connector={CONNECTORS.FB} />
			)}
			{twData && (
				<SentimentDisplay {...twData} connector={CONNECTORS.TW} />
			)}
			{inData && (
				<SentimentDisplay {...inData} connector={CONNECTORS.IN} />
			)}
		</main>
	);
};

export default Sentiments;
