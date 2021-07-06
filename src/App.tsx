import { AppProvider } from "./context/Context";
import { DashBoard } from "./pages/DashBoard";

function App() {
  return (
    <AppProvider>
      <DashBoard />
    </AppProvider>
  );
}

export default App;
