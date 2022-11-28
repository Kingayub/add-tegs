import React, { useEffect, useState } from "react";
import styles from "./index.css";

const App = () => {
  const [inputText, setInputText] = useState("");

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const [initialState, setInitialState] = useState([]);

  const addHandler = () => {
    setInitialState([
      ...initialState,
      {
        name: inputText,
        done: false,
      },
    ]);
    setInputText("");
  };

  const deleteTagsHandler = (indexRemove) => {
    const filtered = initialState.filter((el, index) => {
      if (index === indexRemove) {
        return false;
      }
      return true;
    });
    setInitialState(filtered);
  };

  const [inputDirty, setInputDirty] = useState(false);
  const [inputError, setInputError] = useState("Поле не может быть пустым");
  const [validate, setValidate] = useState(true);

  useEffect(() => {
    if (inputError) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [inputError]);

  useEffect(() => {
    if (inputText !== "") {
      setValidate(false);
      setInputError("");
    } else {
      setValidate(true);
      setInputError("Поле не может быть пустым");
    }
  }, [inputText]);

  const blurHandler = (e) => {
    if (e.target.name === "text" && e.target.value === "") {
      setInputDirty(true);
    } else {
      setInputDirty(false);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Введите что-то..."
          className="input"
          name="text"
          type="text"
          value={inputText}
          onChange={handleInput}
          onBlur={(e) => blurHandler(e)}
        />
        <button
          disabled={validate}
          className="submit"
          onClick={() => addHandler()}
        >
          Отправить
        </button>
        {inputDirty && inputError && (
          <div className="modal_div">Поле не может быть пустым</div>
        )}
      </div>
      <div className="main_content_div">
        {initialState.map((el, index) => (
          <div className="tags">
            {el.name}{" "}
            <span
              role="button"
              onClick={() => {
                deleteTagsHandler(index);
              }}
            >
              x
            </span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
