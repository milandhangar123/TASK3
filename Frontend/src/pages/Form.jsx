import React, { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    contactNo: "",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("email", form.email);
    formData.append("contactNo", form.contactNo);
    formData.append("address", form.address);
    formData.append("image", form.image);

    try {
      const res = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert("User saved successfully!");
      console.log(data);

      // Reset form
      setForm({
        firstName: "",
        email: "",
        contactNo: "",
        address: "",
        image: null,
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Error saving user!");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>User Details Form</h2>

      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Contact No.</label>
        <input
          type="tel"
          name="contactNo"
          value={form.contactNo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
