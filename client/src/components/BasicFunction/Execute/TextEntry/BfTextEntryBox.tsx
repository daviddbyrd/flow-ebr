import type {
  TextEntryModel,
  SpecifiedBasicFunctionModel,
} from "../../CreateEdit/CreateBasicFunction";

interface BfTextEntryBoxProps {
  basicFunction: TextEntryModel;
  setBasicFunction: (newBasicFunction: SpecifiedBasicFunctionModel) => void;
}

const BfTextEntryBox: React.FC<BfTextEntryBoxProps> = ({
  basicFunction,
  setBasicFunction,
}) => {
  const setEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBasicFunction({ ...basicFunction, entry: value });
  };

  return (
    <div
      className="flex flex-col w-8/10 items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-xl">{basicFunction.prompt}</div>
      <input
        type="text"
        placeholder="Enter text"
        disabled={basicFunction.isComplete}
        value={basicFunction.entry as string}
        onChange={(e) => setEntry(e)}
        className="h-12 w-full text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none bg-white"
      />
    </div>
  );
};

export default BfTextEntryBox;
