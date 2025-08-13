import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BasicFunctionBox from "../BasicFunction/CreateEdit/BasicFunctionBox";
import type { SpecifiedBasicFunctionModel } from "../BasicFunction/CreateEdit/CreateBasicFunction";

const EditProductionOrderMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { processUnitId, productionOrderId } = useParams();
  const [basicFunctions, setBasicFunctions] = useState<
    SpecifiedBasicFunctionModel[]
  >([]);
  const [isReordering, setIsReordering] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [processUnitId, productionOrderId]);

  const fetchData = async () => {
    await fetchBasicFunctions();
  };

  const fetchBasicFunctions = async () => {
    const response = await axios.get(
      `${serverUrl}/production-order/${productionOrderId}/basic-functions`
    );
    if (response.status === 200) {
      setBasicFunctions(response.data);
    }
  };

  const goToEditBasicFunction = async (
    basicFunction: SpecifiedBasicFunctionModel
  ) => {
    if (!isReordering) {
      navigate(`basic-function/${basicFunction.basicFunctionId}`);
    }
  };

  const cancelReordering = async () => {
    setIsReordering(false);
    await fetchBasicFunctions();
  };

  const saveReordering = async () => {
    const response = await axios.post(
      `${serverUrl}/production-order/${productionOrderId}/reorder`,
      {
        basicFunctions: basicFunctions,
      }
    );
    if (response.status === 200) {
      setBasicFunctions(response.data);
      setIsReordering(false);
    }
  };

  const setOrder = ({
    oldPosition,
    newPosition,
  }: {
    oldPosition: number;
    newPosition: number;
  }) => {
    if (newPosition > basicFunctions.length) {
      return;
    }
    if (newPosition < oldPosition) {
      setBasicFunctions((prev) =>
        prev.map((basicFunction) => {
          if (basicFunction.position == oldPosition) {
            return { ...basicFunction, position: newPosition };
          } else if (
            basicFunction.position < oldPosition &&
            basicFunction.position >= newPosition
          ) {
            return { ...basicFunction, position: basicFunction.position + 1 };
          } else {
            return basicFunction;
          }
        })
      );
    } else if (newPosition > oldPosition) {
      setBasicFunctions((prev) =>
        prev.map((basicFunction) => {
          if (basicFunction.position == oldPosition) {
            return { ...basicFunction, position: newPosition };
          } else if (
            basicFunction.position > oldPosition &&
            basicFunction.position <= newPosition
          ) {
            return { ...basicFunction, position: basicFunction.position - 1 };
          } else {
            return basicFunction;
          }
        })
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {isReordering ? (
        <div className="w-3/5 flex flex-row justify-around items-center">
          <button
            className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer flex-shrink-0"
            onClick={() => saveReordering()}
          >
            Save Order
          </button>
          <button
            className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-red-300 hover:bg-red-400 cursor-pointer flex-shrink-0"
            onClick={() => cancelReordering()}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="w-3/5 flex flex-row justify-around items-center">
          <button
            className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer flex-shrink-0"
            onClick={() => navigate("basic-function/new")}
          >
            Create New Basic Function +
          </button>
          <button
            className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-gray-300 hover:bg-gray-400 cursor-pointer flex-shrink-0"
            onClick={() => setIsReordering(true)}
          >
            Reorder
          </button>
        </div>
      )}

      {basicFunctions && (
        <div className="w-full flex flex-col items-center">
          {basicFunctions
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((basicFunction) => {
              return (
                <BasicFunctionBox
                  key={basicFunction.basicFunctionId}
                  basicFunction={basicFunction}
                  handleClick={goToEditBasicFunction}
                  isReordering={isReordering}
                  setOrder={setOrder}
                  numFunctions={basicFunctions.length}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default EditProductionOrderMenu;
