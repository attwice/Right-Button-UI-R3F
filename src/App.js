import React, { useState } from "react";
import { Visualizer } from "./Visualizer";
import styled from "styled-components";
import { LabelList } from "./List";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
`;

export default function App() {
  const [selectedLabel, setSelectedLabel] = useState([]);

  return (
    <Container>
      <LabelList
        selectedLabel={selectedLabel}
        setSelectedLabel={setSelectedLabel}
      />
      <Visualizer onChannels={selectedLabel.channels || []} />
    </Container>
  );
}
