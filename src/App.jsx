import { useRoutes, BrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { AuthProvider } from "./contexts/authContext";
import Initializer from "./appInitilizer"; // Fixed spelling

const Router = () => {
  return useRoutes(routes);
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Initializer> {/* Moved inside AuthProvider */}
          <Router />
        </Initializer>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
