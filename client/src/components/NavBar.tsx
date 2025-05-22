const NavBar: React.FC = () => {
  return (
    <div className="fixed w-full h-12 backdrop-blur flex flex-row justify-left top-0">
      <div className="ml-10 cursor-pointer">Flow MES</div>
      <div className="ml-10 cursor-pointer">Execute</div>
      <div className="ml-10 cursor-pointer">Create</div>
    </div>
  );
};

export default NavBar;
