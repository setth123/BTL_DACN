// PaymentReturn.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentReturn() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Thanh toán thất bại");
    navigate("/");
  }, []);

  return (
    <div>
      <h2>Đang xử lý kết quả thanh toán...</h2>
    </div>
  );
}

export default PaymentReturn;
