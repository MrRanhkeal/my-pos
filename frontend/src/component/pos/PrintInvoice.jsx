import { Col, Flex, Row } from "antd";
import React from "react";
import { formatDateClient } from "../../util/helper";
import logo from "../../assets/coffee-shop.jpg";

const PrintInvoice = React.forwardRef(({ cart_list = [], objSummary = {} }, ref) => {
  // Add print styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        @page {
          size: 80mm auto;
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const findTotalItem = (item) => {
    let total = item.cart_qty * item.price;
    if (item.discount) {
      let discount_price = (total * item.discount) / 100;
      total = total - discount_price;
    }
    return total.toFixed(2);
  };
  return (
    <div
      ref={ref}
      style={{
        width: "80mm",
        padding: "5px",
        fontFamily: "monospace",
        fontSize: "10px",
        backgroundColor: "white",
        margin: "0 auto",
      }}
    >
      <Flex align="center">
        <img
          src={logo}
          alt=""
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            borderRadius: 15,
          }}
        />
        <div>
          <div style={{ fontWeight: "bold" }}>Coffee Shop</div>
          <div style={{ fontSize: 9 }}>V-Freind</div>
        </div>
      </Flex>
      <hr />
        
      <div style={{ marginBottom: 15, marginTop: 5 }}>
        {/* {props.objSummary?.order_no}|{" "} */}
        {/* {formatDateClient(props.objSummary?.order_date, "DD/MM/YYYY h:mm ss A")} */}
      </div>
      <table className="pos_tbl_invoice">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Dis(%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cart_list) && cart_list.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "40mm" }}>{item.name}</td>
              <td>{item.cart_qty}</td>
              <td>{item.price}$</td>
              <td>{item.discount}%</td>
              <td>{findTotalItem(item)}$</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className={"row_between_invoice"}>
          <div>Total Qty </div>
          <div>{objSummary.total_qty || 0} Items</div>
        </div>
        <div className={"row_between_invoice"}>
          <div>Sub total </div>
          <div>{objSummary.sub_total || 0}$</div>
        </div>
        <div className={"row_between_invoice"}>
          <div>Save($) </div>
          <div>{objSummary.save_discount || 0}$</div>
        </div>
        <div className={"row_between_invoice"}>
          <div style={{ fontWeight: "bold" }}>Total </div>
          <div style={{ fontWeight: "bold" }}>{objSummary.total || 0}$</div>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>Thank you for your purchase!</p>
    </div>
  );
});

export default PrintInvoice;
