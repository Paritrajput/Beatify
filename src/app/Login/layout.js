import { userProvider } from "@/ContextApi/userContext";
const LoginLayout = ({ children }) => {
  return (
    <userProvider>
      <body>{children}</body>
    </userProvider>
  );
};

export default LoginLayout;
