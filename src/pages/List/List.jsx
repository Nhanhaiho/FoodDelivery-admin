import React, { useEffect, useState } from "react";
import "./List.css";
import "./modal.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    _id: "",
  });

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the food list.");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Error fetching the food list.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing food.");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error removing food.");
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditData({
      name: "",
      description: "",
      price: "",
      category: "",
      _id: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${url}/api/food/edit/${editData._id}`,
        editData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        closeEditModal();
        fetchList();
      } else {
        toast.error("Error updating food!");
      }
    } catch (error) {
      console.error("Error editing food:", error);
      toast.error("Error updating food!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <div className="action-buttons">
              <button onClick={() => handleEdit(item)} className="cursor">
                Edit
              </button>
              <button onClick={() => removeFood(item._id)} className="cursor">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditOpen && (
        <>
          <div className="edit-modal-overlay" onClick={closeEditModal}></div>
          <div className="edit-modal">
            <button className="close-button" onClick={closeEditModal}>
              &times;
            </button>
            <form onSubmit={handleEditSubmit}>
              <h2>Edit Food</h2>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                required
              />
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                required
              />
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                required
              />
              <label>Category</label>
              <select
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                name="category"
                value={editData.category}
              >
                <option value="" disabled hidden>
                  Choose
                </option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
              <button type="submit">Save</button>
              <button type="button" onClick={closeEditModal}>
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
