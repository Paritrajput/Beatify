import NavBar from "@/Components/Header/Header";

const AboutLayout = ({ children }) => {
  return (
    <body>
      <NavBar />
      {children}
    </body>
  );
};

export default AboutLayout;
