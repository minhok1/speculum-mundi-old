import NavSidebar from "../../NavSidebar/NavSidebar";
import DetailWidget from "./DetailWidget";
import "./TimelineView.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Abstract, TimelineEvent } from "../../types";
import { Edge, Node } from "vis-network/standalone/esm/vis-network";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import TimelineSearchList from "./TimelineSearchList";
import AbstractDisplay from "./AbstractDisplay";
import TimelineDiagram from "./TimelineDiagram";
import TimelineOptionsWidget from "./TimelineOptionsWidget";
import EditView from "../../Shared/EditView/EditView";
import AccessError from "../../Shared/AccessError/AccessError";
import TimelineBar from "./TimelineBar";
import { DateToBarNumber, extractCurrentDate } from "../../Utils";
import { Container, Col, Row } from "react-bootstrap";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [causeEffectEdges, setCauseEffectEdges] = useState<Edge[]>([]);
  const [locationShiftEdges, setLocationShiftEdges] = useState<Edge[]>([]);
  const [showDetail, setShowDetail] = useState<string>("");
  const [detail, setDetail] = useState<string | null>(null); //stores id
  const [isEditView, setIsEditView] = useState<boolean>(false);
  const [isEditNode, setIsEditNode] = useState<boolean>(true);
  const [isEditAddition, setIsEditAddition] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Number>(
    DateToBarNumber({ year: -2600 })
  );
  const [endDate, setEndDate] = useState<Number>(
    DateToBarNumber(extractCurrentDate())
  );

  const currState = useSelector((state: any) => state);

  return (
    <Container className="page-container">
      <Row className="page-container-row">
        <Col md={1} className="navbar-container">
          <NavSidebar currentPath="/timeline" />
        </Col>
        <Col className="contents-container">
          <Row>
            <ProfileHeader pageTitle="Timeline" />
          </Row>
          <Row>
            <SearchBar setSearchList={setSearchList} />
          </Row>
          {currState.auth.account ? (
            <Row className="dashboard-container g-0">
              <Col md={1} className="timeline-left-container">
                <Row className="search-abstracts h-50 g-0">
                  <TimelineSearchList
                    searchList={searchList}
                    abstracts={abstracts}
                    setAbstracts={setAbstracts}
                  />
                </Row>
                <Row className="displayed-abstracts h-50 g-0">
                  <AbstractDisplay
                    abstracts={abstracts}
                    setAbstracts={setAbstracts}
                  />
                </Row>
              </Col>
              <Col className="timeline-right-container">
                <TimelineOptionsWidget
                  setEditStatus={setIsEditView}
                  setIsEditNode={setIsEditNode}
                  setIsEditAddition={setIsEditAddition}
                />
                <TimelineDiagram
                  abstracts={abstracts}
                  nodes={nodes}
                  setNodes={setNodes}
                  edges={edges}
                  setEdges={setEdges}
                  causeEffectEdges={causeEffectEdges}
                  setCauseEffectEdges={setCauseEffectEdges}
                  locationShiftEdges={locationShiftEdges}
                  setLocationShiftEdges={setLocationShiftEdges}
                  setDetail={setDetail}
                  setShowDetail={setShowDetail}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
                <TimelineBar
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
                {showDetail && <DetailWidget detail={detail} />}
                {isEditView && (
                  <EditView
                    isEditNode={isEditNode}
                    isEditAddition={isEditAddition}
                    abstracts={abstracts}
                    setAbstracts={setAbstracts}
                  />
                )}
              </Col>
            </Row>
          ) : (
            <AccessError />
          )}
        </Col>
      </Row>
    </Container>
  );
}
