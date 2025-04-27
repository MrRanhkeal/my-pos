import { useEffect, useState } from "react";
import { request } from "../../util/helper";
import HomeGrid from "../../component/home/HomeGrid";
import HomeSaleChart from "../../component/home/HomeSaleChart";
import HomePurchaseChart from "../../component/home/HomePurchaseChart";
import { Button, Col, Row } from "antd";
import { configStore } from "../../store/configStore";
import HomeExpenseByMonthChart from "../../component/home/HomeExpenseByMonthChart";
import { getPermission } from "../../store/profile.store";

function HomePage() {
  const [dashboard, setDashboard] = useState([]);
  const [saleByMonth, setSaleByMonth] = useState([]);
  const [expenseByMonth, setExpenseByMonth] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await request("dashabord", "get");
    if (res && !res.error) {
      setDashboard(res.dashboard);
      if (res.sale_summary_by_month) {
        let dataTmp = [["Month", "Sales"]];
        res.sale_summary_by_month.forEach((item) => {
          dataTmp.push([item.title + "", Number(item.total) || 0]);
        });
        setSaleByMonth(dataTmp);
      }
      if (res.expense_summary_by_month) {
        let dataTmp = [["Month", "Expense"]];
        res.expense_summary_by_month.forEach((item) => {
          dataTmp.push([item.title + "", Number(item.total) || 0]);
        });
        setExpenseByMonth(dataTmp);
      }
    }
  };
  const permission = getPermission();
  return (
    <div>
      {permission?.map((item, index) => (
        <div key={index}>
          <div>
            {item.name}:{item.web_route_key}
          </div>
        </div>
      ))}
      <HomeGrid data={dashboard} />
      <Row>
        <Col span={12}>
          <HomeSaleChart data={saleByMonth} />
        </Col>
        <Col span={12}>
          <HomeExpenseByMonthChart data={expenseByMonth} />
        </Col>
      </Row>
      <HomeExpenseByMonthChart data={expenseByMonth} />
    </div>
  );
}

export default HomePage;
