import { timer, of } from "rxjs";

export const handleError = (err) => console.error(err);

export const createErrorObservable = (res) =>
	of({ error: true, message: `Error ${res.status}` });

export const createFilteredData = ([data, currentFilters]) => {
	const filteredSentiment = {};
	Object.entries(currentFilters).forEach(([filterKey, isOn]) => {
		if (isOn) {
			filteredSentiment[filterKey] = data.sentiment[filterKey];
		}
	});
	return {
		...data,
		sentiment: filteredSentiment,
	};
};

export const createNewFilters = ([sentimentToFilter, currentFilters]) => {
	const sentimentKey = sentimentToFilter.toLowerCase();
	return {
		...currentFilters,
		[sentimentKey]: !currentFilters[sentimentKey],
	};
};
