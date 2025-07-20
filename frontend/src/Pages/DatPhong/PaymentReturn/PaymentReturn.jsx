// PaymentReturn.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaymentReturn() {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const responseCode = queryParams.get("vnp_ResponseCode");
    const orderId = queryParams.get("vnp_TxnRef");

    if (responseCode === "00") {
      alert(`Thanh toán thành công! Mã hóa đơn: ${orderId}`);
    } else {
      alert("Thanh toán thất bại hoặc bị hủy.");
    }

  }, [location]);

  return (
    <div>
      <h2>Đang xử lý kết quả thanh toán...</h2>
    </div>
  );
}

export default PaymentReturn;
