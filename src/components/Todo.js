import React, { useState } from "react";

const Todo = () => {
  const [data, setData] = useState("");
  const [item, setItem] = useState([]);

  const addItem = () => {
    if (!data) {
    } else {
      setItem([...item, data]);
      setData("");
    }
  };

  const deletItem = (id) => {
    const updateItem = item.filter((elm, ind) => {
      return ind !== id;
    });
    setItem(updateItem);
  };

  const removeAll = () => {
    setItem([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="" />
            <figcaption>Add Your Work</figcaption>
          </figure>
          <div className="additem">
            <input
              type="text"
              placeholder="add items..."
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <i
              className="fa-solid fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            ></i>
          </div>

          <div className="showitem">
            {item.map((elm, indx) => {
              return (
                <div className="eachitem" key={indx}>
                  <h3>{elm}</h3>
                  <i
                    className="fa-sharp fa-solid fa-trash"
                    title="delete item"
                    onClick={() => deletItem(indx)}
                  ></i>
                </div>
              );
            })}
          </div>

          <div className="showitmes">
            <button className="btn" onClick={removeAll}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
