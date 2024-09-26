import React, { useEffect, useState } from "react";

// Constants
import Environment from "./utils/environment";

// Styling
import AppStyles from "./App.module.scss";

function App() {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await fetch(Environment.resolveApi());
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    await fetch(Environment.resolveApi(), {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const verifyData = async () => {
    throw new Error("Not implemented");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={AppStyles["container"]}>
      <div>Saved Data</div>

      <input
        className={AppStyles["input"]}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div className={AppStyles["footer"]}>
        <button className={AppStyles["footer__btn"]} onClick={updateData}>
          Update Data
        </button>
        <button className={AppStyles["footer__btn"]} onClick={verifyData}>
          Verify Data
        </button>
      </div>
    </div>
  );
}

export default App;
