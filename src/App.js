import React from "react";
import "./App.css";
import Sentiments from "./Sentiments";
import Header from "./Header";
import { CONNECTORS } from "./consts";
import useDataStream from "./DataStreams/useDataStream";

/*
2. sentiment filter subject to map?
3. add lable to counter
4. add loading state when turning back on
*/

function App() {
  const {
    state: fbState,
    initStream: initFbStream,
    stopStream: stopFbStream,
    updateFilters: updateFbFilters,
  } = useDataStream(CONNECTORS.FB);

  const {
    state: twState,
    initStream: initTwStream,
    stopStream: stopTwStream,
    filterStream: filterTwStream,
    updateFilters: updateTwFilters,
  } = useDataStream(CONNECTORS.TW);

  const {
    state: inState,
    initStream: initInStream,
    stopStream: stopInStream,
    filterStream: filterInStream,
    updateFilters: updateInFilters,
  } = useDataStream(CONNECTORS.IN);

  const connectorStreamMap = {
    fb: { init: initFbStream, stop: stopFbStream },
    tw: { init: initTwStream, stop: stopTwStream },
    in: { init: initInStream, stop: stopInStream },
  };

  const handleConnectorToggle = (name, isSelected) => {
    const { init, stop } = connectorStreamMap[name];
    if (isSelected) {
      init();
    } else {
      stop();
    }
  };

  const handleSentimentToggle = (name, isSelected) => {
    updateFbFilters(name);
    updateTwFilters(name);
    updateInFilters(name);
  };

  return (
    <div className="app">
      <Header
        handleConnectorToggle={handleConnectorToggle}
        handleSentimentToggle={handleSentimentToggle}
      />
      <Sentiments fbData={fbState} twData={twState} inData={inState} />
    </div>
  );
}

export default App;
