import React from "react";

import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const tableData = [
  {
    classID: 1,
    className: "Rocket 01",
    startDate: "2020-06-30T17:00:00.000+00:00",
    endDate: "2020-12-02T17:00:00.000+00:00",
    description: "Lop hoc IT Rocket 01",
    status: "PENDING",
    totalStudent: 20,
    teachingForm: "ONLINE",
  },
  {
    classID: 2,
    className: "Railway 02",
    startDate: "2020-08-02T17:00:00.000+00:00",
    endDate: "2021-02-10T17:00:00.000+00:00",
    description: "Lop hoc NON-IT Railway 02",
    status: "OPENING",
    totalStudent: 11,
    teachingForm: "OFFLINE",
  },
  {
    classID: 3,
    className: "Rocket 02",
    startDate: "2018-02-03T17:00:00.000+00:00",
    endDate: "2019-11-07T17:00:00.000+00:00",
    description: "Lop hoc IT Rocket 02",
    status: "OPENING",
    totalStudent: 15,
    teachingForm: "OFFLINE",
  },
  {
    classID: 4,
    className: "Rocket 03",
    startDate: "2017-11-29T17:00:00.000+00:00",
    endDate: "2018-10-19T17:00:00.000+00:00",
    description: "Lop hoc IT Rocket 03",
    status: "OPENING",
    totalStudent: 8,
    teachingForm: "ONLINE",
  },
  {
    classID: 5,
    className: "Railway 01",
    startDate: "2020-11-10T17:00:00.000+00:00",
    endDate: "2021-11-10T17:00:00.000+00:00",
    description: "Lop hoc NON-IT Railway 01",
    status: "PENDING",
    totalStudent: 10,
    teachingForm: "OFFLINE",
  },
];

const tableColumns = [
  {
    dataField: "classID",
    text: "ClassID",
    sort: true,
  },
  {
    dataField: "className",
    text: "ClassName",
    sort: true,
  },
  {
    dataField: "startDate",
    text: "StartDate",
    sort: true,
  },
  {
    dataField: "endDate",
    text: "EndDate",
    sort: true,
  },
  {
    dataField: "description",
    text: "Description",
    sort: true,
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
  },
  {
    dataField: "totalStudent",
    text: "TotalStudent",
    sort: true,
  },
  {
    dataField: "teachingForm",
    text: "TeachingForm",
    sort: true,
  },
];

const Class = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Class Management</h1>
    <Row>
      <Col>
        <Card>
          <CardBody>
            <BootstrapTable
              keyField="name"
              data={tableData}
              columns={tableColumns}
              bootstrap4
              striped
              hover
              bordered
              pagination={paginationFactory({
                sizePerPage: 10,
                sizePerPageList: [5, 10, 25, 50],
              })}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);
export default Class;
