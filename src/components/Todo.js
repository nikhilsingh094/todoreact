import React, { useEffect, useState } from "react";

// to get data from localstorage

const getLocalItem = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [data, setData] = useState("");
  const [item, setItem] = useState(getLocalItem());

  const [toggle, setToggle] = useState(true); // toggling add and edit icons state

  const [edit, setEdit] = useState(null);

  const addItem = () => {
    if (!data) {
      alert('please fill data')
    } else if (data && !toggle) {
      setItem(
        item.map((elm) => {
          if (elm.id === edit) {
            return { ...elm, name: data }
          }
          return elm;
        })
      )
      setToggle(true);
      setData('');
      setEdit(null)
    } else {
      const allData = { id: new Date().getTime().toString(), name: data }; // generate unique id here

      setItem([...item, allData]);
      setData("");
    }
  };

  //delete items
  const deletItem = (index) => {
    const updateItem = item.filter((elm) => {
      return index !== elm.id;
    });
    setItem(updateItem);
  };

  // remove all
  const removeAll = () => {
    setItem([]);
  };

  //add data to local storage

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(item));
  }, [item]);

  // for edit item

  const editItem = (id) => {
    const editItem = item.find((elm) => {
      return elm.id === id;
    });

    setToggle(false)
    setData(editItem.name);
    setEdit(id)

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
            {toggle ? (
              <i
                className="fa-solid fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa-solid fa-pen-to-square"
                title="edit item"
                onClick={addItem}
              ></i>
            )}
            <input
              type="text"
              placeholder="add items..."
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="showitem">
            {item.map((elm) => {
              return (
                <div className="eachitem" key={elm.id}>
                  <h3>{elm.name}</h3>
                  <i
                    className="fa-solid fa-pen-to-square"
                    title="edit item"
                    onClick={() => editItem(elm.id)}
                  ></i>
                  <i
                    className="fa-sharp fa-solid fa-trash"
                    title="delete item"
                    onClick={() => deletItem(elm.id)}
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
