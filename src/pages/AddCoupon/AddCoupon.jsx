import axios from "axios";
import "./AddCoupon.css";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddCoupon({ url }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    couponCode: "",
    couponName: "",
    description: "",
    discount: 0,
    expiredDate: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("couponCode", data.couponCode);
    formData.append("couponName", data.couponName);
    formData.append("description", data.description);
    formData.append("discount", data.discount);
    formData.append("expiredDate", data.expiredDate);
    console.log(data);
    const response = await axios.post(`${url}/api/coupon/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      setData({
        couponCode: "",
        couponName: "",
        description: "",
        discount: 0,
        expiredDate: "",
      });
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid-container">
      {" "}
      <div className="loading-spinner"></div>{" "}
    </div>
  ) : (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-coupon-code flex-col">
          <p>Coupon code</p>
          <input
            onChange={onChangeHandler}
            value={data.couponCode}
            type="text"
            name="couponCode"
            placeholder="Type here"
          />
        </div>

        <div className="add-coupon-name flex-col">
          <p>Coupon name</p>
          <input
            onChange={onChangeHandler}
            value={data.couponName}
            type="text"
            name="couponName"
            placeholder="Type here"
          />
        </div>

        <div className="add-coupon-description flex-col">
          <p>Coupon description</p>
          <input
            onChange={onChangeHandler}
            value={data.description}
            type="text"
            name="description"
            placeholder="Type here"
          />
        </div>

        <div className="add-coupon-discount flex-col">
          <p>Coupon discount</p>
          <input
            onChange={onChangeHandler}
            value={data.discount}
            type="Number"
            name="discount"
            placeholder="Type here"
          />
        </div>

        <div className="add-coupon-expiredDate flex-col">
          <p>Coupon expired date</p>
          <input
            onChange={onChangeHandler}
            value={data.expiredDate}
            type="date"
            name="expiredDate"
          />
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCoupon;
