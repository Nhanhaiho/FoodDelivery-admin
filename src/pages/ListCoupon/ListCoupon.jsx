import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ListCoupon.css";

function ListCoupon({ url }) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/coupon/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeCoupon = async (couponId) => {
    const response = await axios.post(`${url}/api/coupon/remove`, {
      id: couponId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Coupon List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Coupon Code</b>
          <b>Coupon Name</b>
          <b>Description</b>
          <b>Discount</b>
          <b>Expiration date</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{item.couponCode}</p>
              <p>{item.couponName}</p>
              <p>{item.description}</p>
              <p>{item.discount}</p>
              <p>{item.expiredDate}</p>

              <button onClick={() => removeCoupon(item._id)} className="cursor">
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListCoupon;
