import React from "react";
import { Row, Col } from "antd";
function HomeGrid({ data = [] }) {
  return (
    <Row>
      {data?.map((item, index) => (
        <Col span={6} key={index}>
          <div
            style={{
              backgroundColor: "#EEE",
              padding: 15,
              margin: 5,
              borderRadius: 10,
              minHeight: 100,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: "bold" }}>{item.title}</div>
            {item.summary &&
              Object.keys(item.summary).map((key, index) => (
                <div key={index}>
                  <div>
                    {key} :{" "}
                    <label className="text-green-500 font-bold">
                      {item.summary[key] || 0}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default HomeGrid;
