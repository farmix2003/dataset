import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateEntity from "../components/createEntity";
import { getEntitySuccess, addEntity, updateEntity } from "../slice/entity";
import EntityService from "../service/entityAuth";
import { useNavigate } from "react-router-dom";
import EditEntity from "./editEntity";

const Main = () => {
  const { entities } = useSelector((state) => state.entity);
  const [showCreateSpace, setShowCreateSpace] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getEntities = async () => {
    try {
      const response = await EntityService.getEntities();
      console.log(response);
      dispatch(getEntitySuccess(response));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowCreateSpace(false);
  };

  const handleCreate = async (entity) => {
    try {
      dispatch(addEntity(entity));

      setShowCreateSpace(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntity = async (id) => {
    try {
      await EntityService.deleteEntity(id);
      getEntities();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setSelectedEntity(item);
  };

  useEffect(() => {
    getEntities();
  }, []);

  return (
    <div>
      <h2>Dataset management</h2>
      <button
        type="button"
        className="btn btn-outline-success mt-2 mb-5"
        onClick={() => setShowCreateSpace(true)}
      >
        create
      </button>
      {showCreateSpace && (
        <CreateEntity onCancel={handleCancel} onCreate={handleCreate} />
      )}
      {selectedEntity && (
        <EditEntity
          entity={selectedEntity}
          onCancel={() => setSelectedEntity(null)}
          onSave={(updatedEntity) => {
            dispatch(updateEntity(updatedEntity));
            setSelectedEntity(null);
          }}
        />
      )}

      {entities && entities.length > 0 ? (
        entities.map((item) => (
          <div
            key={item.id}
            style={{
              paddingRight: "5px",
              border: "1px solid black",
              padding: "5px",
            }}
          >
            {item.entity ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Coordinates</th>
                      <th scope="col">Labels</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.entity.name}</td>
                      <td>
                        X: {item.entity.coordinate.x}, Y:{" "}
                        {item.entity.coordinate.y}
                      </td>
                      {item.entity.labels.map((label) => (
                        <td key={label}>{label}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr className="col">
                      <th scope="col">Name</th>
                      <th scope="col">Coordinates</th>
                      <th scope="col">Labels</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>
                        X: {item.coordinate.x}, Y: {item.coordinate.y}
                      </td>
                      {item.labels.map((label) => (
                        <td key={label}>{label}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </>
            )}
            <div className="buttons">
              <button
                className="btn btn-outline-primary me-1"
                onClick={() => navigate(`/entity/${item.id}`)}
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-outline-warning me-1"
                onClick={() => handleEdit(item)}
              >
                edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteEntity(item.id);
                }}
              >
                remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No entities found</div>
      )}
    </div>
  );
};

export default Main;
