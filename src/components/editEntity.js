import React, { useState } from "react";

const EditEntity = ({ entity, onCancel, onSave }) => {
  const [name, setName] = useState(entity.name);
  const [coordinateX, setCoordinateX] = useState(entity.coordinate.x);
  const [coordinateY, setCoordinateY] = useState(entity.coordinate.y);
  const [labels, setLabels] = useState(entity.labels.join(", "));

  const handleCancel = () => {
    onCancel();
  };

  const handleSave = (event) => {
    event.preventDefault();
    const updatedEntity = {
      id: entity.id,
      name,
      coordinate: { x: coordinateX, y: coordinateY },
      labels: labels.split(",").map((label) => label.trim()),
    };

    onSave(updatedEntity);
  };

  return (
    <div className="text-center" style={{ margin: "auto auto" }}>
      <h3>Edit Dataset</h3>
      <form className="container text-center" onSubmit={handleSave}>
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
            value={coordinateX}
            onChange={(event) => setCoordinateX(event.target.value)}
          />
          <label>Y Coordinate:</label>
          <input
            type="number"
            name="y"
            required
            value={coordinateY}
            onChange={(event) => setCoordinateY(event.target.value)}
          />
          <label>Labels (comma-separated):</label>
          <input
            type="text"
            name="labels"
            required
            value={labels}
            onChange={(event) => setLabels(event.target.value)}
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
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEntity;
