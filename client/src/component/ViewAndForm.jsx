import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewAndForm() {
  //server end points
  let server = "http://localhost:4000";
  let url = "http://localhost:4000/uploads";
  // app states
  const [formData, setFormData] = useState({
    img: "",
    name: "",
  });
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  //functions
  let inputHandler = (e) => {
    switch (e.target.name) {
      case "image":
        setFormData((prev) => {
          return { ...prev, img: e.target.files[0] };
        });
        break;
      case "name":
        setFormData((prev) => {
          return { ...prev, name: e.target.value };
        });
        break;
    }
  };
  //to send the data to the server
  let submitHanddler = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("file", formData.img, formData.img.name);
    fd.append("name", formData.name);

    // console.log(formData.name);
    // console.log(fd);
    axios
      .post(url, fd)
      .then((resp) => {
        console.log(resp.data);
        fetchData();
      })
      .catch((err) => console.log(err));
  };
  let fetchData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((resp) => {
        setApiData(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  //to get the data from the server
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="form">
        <form onSubmit={submitHanddler}>
          <div>
            <label htmlFor="image">Image</label>
            <input
              onChange={inputHandler}
              type="file"
              id="image"
              name="image"
            />
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={inputHandler} />
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <ul>
            {apiData?.map((item) => {
              return (
                <>
                  <h3>{item.other}</h3>
                  <li style={{ listStyle: "none" }} key={item.id}>
                    <img
                      style={{ width: "500px" }}
                      src={`${server}/${item.name}`}
                    />
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default ViewAndForm;
