
import './App.css';
import ReadExcel from './Components/ReadExcel';
import LoginPage from './Components/LoginPage';
import {BrowserRouter,Route, Routes } from 'react-router-dom';
// import Fetchingexcelreact from './Components/Fetchingexcelreact';
function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={
      <>
    <div className="App">
      {/* <ReadExcel /> */}
      <LoginPage />
      {/* <Fetchingexcelreact /> */}
    </div>
    </>} />
    <Route path='/ReadExcel' element={<ReadExcel />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
