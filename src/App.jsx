import { BrowserRouter, Routes , Route} from "react-router-dom";
import HomeRoute from "./pages/HomeRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
   <BrowserRouter >
     <Routes>
          <Route path="/" element={<>
          <Navbar/>
            <HomeRoute/>
          <Footer/>
          </>} />
     </Routes>
   </BrowserRouter>
  );
}
