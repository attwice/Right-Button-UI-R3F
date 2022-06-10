import React, { useEffect } from "react";
import styled from "styled-components";
import { sample, sampleSize, round } from "lodash";
import { default21Channels } from "./utils";
import moment from "moment";

const List = styled.div`
  height: 100%;
  width: 500px;
  overflow-y: auto;
  font-family: "helvetica";
  color: #444;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  background: #eee;
  padding: 10px;
  & > * + * {
    margin-top: 10px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  cursor: pointer;
  box-sizing: border-box;
  background: ${({ active }) => (active ? "#dedede" : "#fff")};
  border-radius: 5px;

  &:hover {
    background: #ddd;
  }
`;

const Info = styled.div`
  & > * + * {
    margin-top: 5px;
  }
`;

const Description = styled.div`
  color: #999;
`;

const Badge = styled.div`
  font-size: 0.8em;
  padding: 5px 10px;
  border-radius: 5px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isConfident }) => (isConfident ? "#147514" : "#B20000")};
  background: ${({ isConfident }) => (isConfident ? "#ECF8EA" : "#FAE6E6")};
`;

const randomDate = () => {
  const start = moment().subtract(1, "day");
  const end = moment();
  return moment(
    start.valueOf() + Math.random() * (end.valueOf() - start.valueOf())
  );
};

const labels = [...Array(10)]
  .map((i) => ({
    time: randomDate(),
    duration: round(Math.random() * 3600),
    type: sample(["Ictal", "Interictal"]),
    channels: sampleSize(default21Channels, 10),
    confidence: round((Math.random() * 100) / 2 + 50, 2)
  }))
  .sort((a, b) => a.time - b.time);

export const LabelList = ({ selectedLabel, setSelectedLabel }) => {
  useEffect(() => {
    setSelectedLabel(labels[0]);
  }, [setSelectedLabel]);

  return (
    <List>
      {labels.map((label) => (
        <Row
          key={label.time}
          active={selectedLabel.time === label.time}
          onClick={() => setSelectedLabel(label)}
        >
          <Info>
            <div>
              <b>{label.duration} ms</b>
            </div>
            <Description>
              {label.type} • {label.time.format("HH:mm:ss")} • Day 1
            </Description>
          </Info>
          <Badge isConfident={label.confidence >= 80}>
            {label.confidence}%
          </Badge>
        </Row>
      ))}
    </List>
  );
};
