import { useNavigate, useParams } from "react-router-dom";
import EntityService from "../service/entityAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEntity,
  getEntitySuccess,
  getEntitydetailSuccess,
  updateEntity,
} from "../slice/entity";
import EditEntity from "./editEntity";
const EntityCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch((state) => state.entity);
  const navigation = useNavigate();
  const { entityDetail } = useSelector((state) => state.entity);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const getEntities = async () => {
    try {
      const response = await EntityService.getEntities();
      console.log(response);
      dispatch(getEntitySuccess(response));
    } catch (error) {
      console.log(error);
    }
  };
  const getEntityDetail = async () => {
    try {
      const respone = await EntityService.getEntityDetails(id);
      console.log(respone);
      dispatch(getEntitydetailSuccess(respone));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntity = async (id) => {
    try {
      await EntityService.deleteEntity(id);
      getEntityDetail();
      getEntities();
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (item) => {
    setSelectedEntity(item);
  };

  useEffect(() => {
    getEntityDetail();
  }, [id]);
  console.log(id);

  return (
    <div>
      {showEditForm ? (
        <EditEntity
          entity={entityDetail}
          onCancel={() => setShowEditForm(false)}
          onSave={(updatedEntity) => {
            console.log("Updated entity:", updatedEntity);

            setShowEditForm(false);
          }}
        />
      ) : (
        <>
          <div
            className="container"
            style={{
              width: "80%",
              border: "1px solid black",
              marginTop: "20%",
              padding: "20px",
            }}
          >
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Coordinates</th>
                  <th scope="col">Labels</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{entityDetail?.name}</td>
                  <td>
                    {entityDetail?.coordinate?.x}, {entityDetail?.coordinate?.y}
                  </td>
                  {entityDetail?.labels?.map((item) => (
                    <td
                      className="p-0"
                      style={{ letterSpacing: "0.2px" }}
                      key={item}
                    >
                      {item}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <button
                className="btn btn-outline-primary me-1"
                onClick={() => navigation("/")}
              >
                Home
              </button>
              <button
                className="btn btn-outline-warning me-1"
                onClick={() => setShowEditForm(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteEntity(entityDetail.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EntityCard;
