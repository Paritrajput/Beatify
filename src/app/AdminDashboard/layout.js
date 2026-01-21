import Navbar from "./Navbar";

const adminLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="h-screen">
        <div className="h-screen">
          <Navbar />

          {children}
        </div>
      </body>
    </html>
  );
};
export default adminLayout;
