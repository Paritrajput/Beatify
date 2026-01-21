import NavBar from "@/Components/Header/Header";

const ConnectLayout = ({ children }) => {
  return (
    <body>
      <NavBar />
      {children}
    </body>
  );
};

export default ConnectLayout;
