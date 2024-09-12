import "./App.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/Header/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";

function App() {
  return <div>
    <Toaster />
    <Header />
    <Routes>
      <Route path="/" element={<LocationList />} />
      <Route path="/hotels" element={<AppLayout/>}>
        <Route index element={<Hotels/>}/>
        <Route path=":id" element={<div>single hotel</div>}/> 
      </Route>
    </Routes>
    {/*   <LocationList/> */}
  </div>
}

export default App;

