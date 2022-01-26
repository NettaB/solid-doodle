import { useRef, useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { map, shareReplay, tap, withLatestFrom, share } from "rxjs/operators";
import { generateDataStream } from "./DataStream";
import { handleError, createFilteredData, createNewFilters } from "../utils";
import { SENTIMENTS } from "../consts";

const useDataStream = (connectorName) => {
	const [state, setState] = useState();

	const subscription = useRef(null);

	let latestFilters = useRef(
		new BehaviorSubject({
			positive: true,
			negative: true,
			neutral: true,
		}).pipe(shareReplay())
	);

	const initStream = () => {
		subscription.current = generateDataStream(connectorName)
			.pipe(
				withLatestFrom(latestFilters.current),
				map(createFilteredData)
			)
			.subscribe({
				next: (res) => {
					setState(res);
				},
			});
	};

	const stopStream = () => {
		setState(null);
		subscription.current.unsubscribe();
	};

	const updateFilters = (sentiment) => {
		new BehaviorSubject(sentiment)
			.pipe(withLatestFrom(latestFilters.current), map(createNewFilters))
			.subscribe(latestFilters.current);
	};

	useEffect(() => {
		initStream();
		return stopStream;
	}, []);

	return {
		state,
		initStream,
		stopStream,
		updateFilters,
	};
};

export default useDataStream;
