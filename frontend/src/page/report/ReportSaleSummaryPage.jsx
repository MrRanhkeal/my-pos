import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Button, DatePicker, Select, Space, Table, Tag } from "antd";
import { request } from "../../util/helper";
import dayjs from "dayjs";
import { configStore } from "../../store/configStore";

export const options = {
  // title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const ReportSaleSummaryPage = () => {
  const { config } = configStore();
  const [state, setState] = useState({
    data_chart: [],
    list: [],
  });
  const [filter, setFilter] = useState({
    from_date: dayjs().subtract(29, "d"),
    to_date: dayjs(),
    category_id: null,
    brand_id: null,
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async (params = {}) => {
    let param = {
      from_date: dayjs(filter.from_date).format("YYYY-MM-DD"),
      to_date: dayjs(filter.to_date).format("YYYY-MM-DD"),
      category_id: filter.category_id,
      brand_id: filter.brand_id,
      ...params,
    };
    const res = await request("report_sale_summary", "get", param);
    if (res && res.list && res.list.length > 0) {
      let listTmp = [["Day", "Sale"]];
      res.list?.forEach((item) => {
        listTmp.push([item.title, Number(item.total_amount)]);
      });
      setState((p) => ({
        ...p,
        list: res.list,
        data_chart: listTmp,
      }));
    } else {
      setState((p) => ({
        ...p,
        list: [],
        data_chart: [],
      }));
    }
  };

  const onReset = () => {
    // window.location.reload(); // worked
    const data_filter = {
      from_date: dayjs().subtract(29, "d"),
      to_date: dayjs(),
      category_id: null,
      brand_id: null,
    };
    setFilter((p) => ({
      ...p,
      ...data_filter,
    }));
    getList({
      ...data_filter,
      from_date: dayjs(data_filter.from_date).format("YYYY-MM-DD"),
      to_date: dayjs(data_filter.to_date).format("YYYY-MM-DD"),
    });
  };

  return (
    <div>
      <div className="chatCard">
        <div className="chatCardHeader">
          <Space>
            <div className="textTitle">Sale Summary</div>
            <DatePicker.RangePicker
              allowClear={false}
              value={[filter.from_date, filter.to_date]}
              defaultValue={[
                dayjs(filter.from_date, "DD/MM/YYYY"),
                dayjs(filter.to_date, "DD/MM/YYYY"),
              ]}
              format={"DD/MM/YYYY"}
              onChange={(value) => {
                setFilter((p) => ({
                  ...p,
                  from_date: value[0],
                  to_date: value[1],
                }));
              }}
            />
            <Select
              allowClear
              style={{ width: 150 }}
              placeholder="Category"
              value={filter.category_id}
              options={config?.category}
              onChange={(value) => {
                setFilter((p) => ({
                  ...p,
                  category_id: value,
                }));
              }}
            />
            <Select
              allowClear
              style={{ width: 150 }}
              placeholder="Brand"
              value={filter.brand_id}
              options={config?.brand}
              onChange={(value) => {
                setFilter((p) => ({
                  ...p,
                  brand_id: value,
                }));
              }}
            />
            <Button onClick={onReset}>Reset</Button>
            <Button type="primary" onClick={() => getList()}>
              Filter
            </Button>
          </Space>
        </div>
        {state.data_chart.length > 0 && (
          <Chart
            chartType="LineChart"
            width="100%"
            className="chatStyle"
            data={state.data_chart}
            options={options}
            legendToggle
          />
        )}
      </div>
      <Table
        dataSource={state.list}
        pagination={false}
        columns={[
          {
            key: "title",
            title: "Group By Day",
            dataIndex: "title",
          },
          {
            key: "total_qty",
            title: "Sale Quantity",
            dataIndex: "total_qty",
            render: (value) => <Tag color="green">{value}PCS</Tag>,
          },
          {
            key: "total_amount",
            title: "Sale Amout",
            dataIndex: "total_amount",
            render: (value) => <Tag color="green">{value}$</Tag>,
          },
        ]}
      />
    </div>
  );
};

export default ReportSaleSummaryPage;
