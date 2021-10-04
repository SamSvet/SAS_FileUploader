import React from 'react'
import {NavigationBar} from "./components/NavigationBar"
import {FileParamsCard} from "./components/cards/process/FileParamsCard"
import {SelectFileCard} from "./components/cards/selectFile/SelectFileCard"
import {Divider} from "./components/containers/Divider"
import {SummarySASCard} from "./components/cards/summary/SummarySASCard"
import {SummaryCard} from "./components/cards/summary/SummaryCard"

function App() {
  return (
    <>
      <NavigationBar/>
      <FileParamsCard/>
      <SelectFileCard/>
      <Divider/>
      <SummarySASCard/>
      {/*<SummaryCard/>*/}
    </>
  );
}

export default App;