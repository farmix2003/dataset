import React, { useState } from "react";
import EntityService from "../service/entityAuth";

const CreateEntity = ({ onCancel, onCreate }) => {
  const [name, setName] = useState("");
  const [coordinate, setCoordinate] = useState({ x: "", y: "" });
  const [labels, setLabels] = useState([]);

  const handleCancel = () => {
    onCancel();
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const entity = { name, coordinate, labels };
    onCreate(entity);
    try {
      const response = await EntityService.postEntity(entity);
      console.log("Dataset created:", response.data);

      setName("");
      setCoordinate({ x: "", y: "" });
      setLabels([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Create Dataset</h3>
      <form className="container text-center" onSubmit={handleCreate}>
        <div className="row w-50">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>X Coordinate:</label>
          <input
            type="number"
            name="x"
            required
            value={coordinate.x}
            onChange={(event) =>
              setCoordinate((prevCoordinate) => ({
                ...prevCoordinate,
                x: event.target.value,
              }))
            }
          />
          <label>Y Coordinate:</label>
          <input
            type="number"
            name="y"
            required
            value={coordinate.y}
            onChange={(event) =>
              setCoordinate((prevCoordinate) => ({
                ...prevCoordinate,
                y: event.target.value,
              }))
            }
          />
          <label>Labels (comma-separated):</label>
          <input
            type="text"
            name="labels"
            required
            value={labels.join(", ")}
            onChange={(event) =>
              setLabels(
                event.target.value.split(",").map((label) => label.trim())
              )
            }
          />
          <div className="row mt-2">
            <div className="col">
              <button
                className="btn btn-outline-danger w-100"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-outline-success w-100">
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEntity;
