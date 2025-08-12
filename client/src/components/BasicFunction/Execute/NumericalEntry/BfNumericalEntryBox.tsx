import type {
  NumericalEntryModel,
  SpecifiedBasicFunctionModel,
} from "../../CreateEdit/CreateBasicFunction";

interface BasicFunctionBoxProps {
  basicFunction: NumericalEntryModel;
  setBasicFunction: (newBasicFunction: SpecifiedBasicFunctionModel) => void;
}

const BfNumericalEntryBox: React.FC<BasicFunctionBoxProps> = ({
  basicFunction,
  setBasicFunction,
}) => {
  const setEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value === "" ? null : Number(value);
    if (parsedValue) {
      setBasicFunction({ ...basicFunction, entry: parsedValue });
    }
  };

  return (
    <div
      className="flex flex-col w-8/10 items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-xl">{basicFunction.prompt}</div>
      <input
        type="text"
        name="name"
        placeholder="Enter text"
        value={basicFunction.entry}
        onChange={(e) => setEntry(e)}
        className="h-12 w-full text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none bg-white"
      />
    </div>
  );
};

export default BfNumericalEntryBox;
