import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [color, setColor] = useState("");
  const [data, setData] = useState([]);
  // const [updatedData, setUpdatedData] = useState({ ...data });
  const host = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/getusers`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Any side effects or logic to run when data is updated
    console.log("Data updated", data);
  }, [data]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${host}/api/addusers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          contact,
          color,
        }),
      });
      const json = await response.json();
      if (json.success) {
        alert("data added to DB successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    console.log(id);
    //   try {
    //     const response = await axios.put(
    //       `${host}/api/updateusers/:${id}`,
    //       updatedData
    //     );
    //     const json = response.json();
    //     setData(json.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${host}/api/deleteusers/${id}`);
      const json = response.data;
      console.log(json);
      setData(json);
      if (json.success) {
        alert("entry deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex flex-col mx-40 my-8" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          name="contact"
          value={contact}
          onChange={handleContactChange}
        />
        <select value={color} onChange={handleColorChange}>
          <option value="">Select Color</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
        <br />
        <button className="bg-blue-700 text-white" type="submit">
          Submit Data
        </button>
      </form>

      <div className="text-center bg-yellow-500 text-red-900">Display Data</div>
      <table className="w-full border-separate">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="py-2">Sr No</th>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Color</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.name}</td>
              <td className="text-center">{item.location}</td>
              <td className="text-center">{item.contact}</td>
              <td className="text-center">{item.color}</td>
              <td className="text-center">
                <button
                  className="text-red-700 text-center"
                  onClick={() => {
                    handleUpdate(item.id);
                  }}
                >
                  Update
                </button>
              </td>
              <td className="text-center">
                <button
                  className="text-red-700 text-center"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
