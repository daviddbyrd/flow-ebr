import type {
  NumericalEntryModel,
  SpecifiedBasicFunctionModel,
} from "../../CreateEdit/CreateBasicFunction";

interface BfNumericalEntryBoxProps {
  basicFunction: NumericalEntryModel;
  setBasicFunction: (newBasicFunction: SpecifiedBasicFunctionModel) => void;
}

const BfNumericalEntryBox: React.FC<BfNumericalEntryBoxProps> = ({
  basicFunction,
  setBasicFunction,
}) => {
  const setEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === "" ? null : Number(value); // handle empty input gracefully
    setBasicFunction({ ...basicFunction, entry: numericValue });
  };
  return (
    <div
      className="flex flex-col w-8/10 items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-xl">{basicFunction.prompt}</div>
      {(basicFunction.min !== null || basicFunction.max !== null) && (
        <div className="flex flex-row justify-around w-full">
          {basicFunction.min !== null && <div>Min: {basicFunction.min}</div>}
          {basicFunction.max !== null && <div>Max: {basicFunction.max}</div>}
        </div>
      )}
      <input
        type="number"
        placeholder="Enter value"
        disabled={basicFunction.isComplete}
        value={basicFunction.entry as number}
        onChange={(e) => setEntry(e)}
        className="h-12 w-full text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none bg-white"
      />
    </div>
  );
};

export default BfNumericalEntryBox;
