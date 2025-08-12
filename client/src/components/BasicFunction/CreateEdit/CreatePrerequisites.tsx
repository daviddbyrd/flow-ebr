import type { SpecifiedBasicFunctionModel } from "./CreateBasicFunction";
import type { SetStateAction } from "react";
import CreatePrerequisiteBox from "./CreatePrerequisiteBox";

interface CreatePrerequisitesProps {
  basicFunction: SpecifiedBasicFunctionModel;
  setBasicFunction: React.Dispatch<
    SetStateAction<SpecifiedBasicFunctionModel | null>
  >;
  basicFunctions: SpecifiedBasicFunctionModel[];
}

const CreatePrerequisites: React.FC<CreatePrerequisitesProps> = ({
  basicFunction,
  setBasicFunction,
  basicFunctions,
}) => {
  const addPrerequisite = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setBasicFunction((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        prerequisites: [...prev.prerequisites, value],
      };
    });
    e.target.value = "";
    console.log("basic function:", basicFunction);
  };

  const removePrerequisite = (prerequisite: string) => {
    setBasicFunction((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        prerequisites: prev.prerequisites.filter((pre) => pre !== prerequisite),
      };
    });
  };

  return (
    <>
      <div className="h-12 w-3/10 flex-shrink-0 flex flex-row justify-between my-4">
        <select
          name="type"
          value=""
          onChange={(e) => addPrerequisite(e)}
          className="h-12 w-full text-lg border border-gray-200 rounded-lg mb-4 mt-2 shadow-sm pl-3 focus:outline-none"
        >
          <option value="" disabled>
            Select prerequisites
          </option>
          {basicFunctions.map((bf: SpecifiedBasicFunctionModel) => {
            if (
              bf.name == basicFunction?.name ||
              basicFunction?.prerequisites.includes(bf.name)
            ) {
              return null;
            }
            return (
              <option key={bf.basicFunctionId} value={bf.name}>
                {bf.name}
              </option>
            );
          })}
        </select>
      </div>
      {basicFunction?.prerequisites.map((prerequisite, ind) => {
        return (
          <CreatePrerequisiteBox
            key={ind}
            prerequisite={prerequisite}
            removePrerequisite={removePrerequisite}
          ></CreatePrerequisiteBox>
        );
      })}
    </>
  );
};

export default CreatePrerequisites;
