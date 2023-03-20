import { Routes,Route,Link } from "react-router-dom";
import { SkillProvider } from "./context/SkillContext";
import { Home } from "./components/Home";
import { SkillIndex } from "./components/skills/SkillIndex";
import { SkillCreate } from "./components/skills/SkillCreate";
import { SkillEdit } from "./components/skills/SkillEdit";
import { ProductIndex } from "./components/products/ProductIndex";
import { ProductCreate } from "./components/products/ProductCreate";
import { ProductEdit } from "./components/products/ProductEdit";
import { PelangganIndex } from "./components/pelanggans/PelangganIndex";
import { PelangganCreate } from "./components/pelanggans/PelangganCreate";
import { PelangganEdit } from "./components/pelanggans/PelangganEdit";
import { CartIndex } from "./components/carts/CartIndex";


function App() {
  return(
  <SkillProvider>
  <div className="bg-slate-200">
    <div className="max-w-7xl mx-auto min-h-screen">
      
      <nav>
        <ul className="flex">
          <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            <Link to="/">Home</Link>
          </li>
          <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            <Link to="/skills">Skills</Link>
          </li>
          <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            <Link to="/products">Products</Link>
          </li>
          <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            <Link to="/pelanggans">Pelanggans</Link>
          </li>
          <li className="m-2 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">
            <Link to="/order">Order</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/skills" element={<SkillIndex/>}/>
        <Route path="/skills/create" element={<SkillCreate/>}/>
        <Route path="/skills/:id/edit" element={<SkillEdit/>}/>
        <Route path="/products" element={<ProductIndex/>} />
        <Route path="/products/create" element={<ProductCreate/>}/>
        <Route path="/products/:id/edit" element={<ProductEdit/>} />
        <Route path="/pelanggans" element={<PelangganIndex/>}/>
        <Route path="/pelanggans/create" element={<PelangganCreate/>}/>
        <Route path="/pelanggans/:id/edit" element={<PelangganEdit/>}/>
        <Route path="/order" element={<CartIndex/>}/>
      </Routes>
    </div>
  </div>
  </SkillProvider>
  ); 
}

export default App;
