const NavBar: React.FC = () => {
  return (
    <div className="fixed w-full h-12 backdrop-blur flex flex-row justify-left items-center top-0 border-b border-gray-100">
      <div className="ml-10 cursor-pointer text-lg font-bold">Flow MES</div>
      <div className="ml-32 cursor-pointer text-lg text-gray-600">Execute</div>
      <div className="ml-32 cursor-pointer text-lg text-gray-600">Create</div>
    </div>
  );
};

export default NavBar;
