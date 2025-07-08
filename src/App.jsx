import { BrowserRouter, Routes , Route} from "react-router-dom";
import HomeRoute from "./pages/HomeRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./pages/protectedRoute";
import AdminRoute from "./admin/AdminRoute";
import BlogRoute from "./pages/BlogRoute";
export default function App() {


  return (
   <BrowserRouter >
     <Routes>
          <Route path="/" element={<>
          <Navbar/>
            <HomeRoute/>
          <Footer/>
          </>} />
          <Route path="/blogs/:id" element={<><Navbar/><BlogRoute /> <Footer/></>} />
          <Route path="/admin/*" element={<ProtectedRoute ><AdminRoute/></ProtectedRoute>} />
     </Routes>
   </BrowserRouter>
  );
}
