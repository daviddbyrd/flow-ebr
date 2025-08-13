interface MissingPrerequisitesProps {
  missingPrerequisites: string[];
}

const MissingPrerequisites: React.FC<MissingPrerequisitesProps> = ({
  missingPrerequisites,
}) => {
  return (
    <div className="flex flex-col w-8/10 items-center">
      <div className="text-xl">Missing Prerequisites:</div>
      {missingPrerequisites.map((missingPrerequisite, index) => {
        return <div key={index}>{missingPrerequisite}</div>;
      })}
    </div>
  );
};

export default MissingPrerequisites;
