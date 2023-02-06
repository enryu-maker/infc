import React from 'react'
import { Login } from './Screens/Auth/Login';
import './App.css'
import { Home } from './Screens/Home/Home';
import SideNav from './Component/SideNav';
import { COLORS } from './Theme/Theme';
import { SideNavModal } from './Component/SideNavModal';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Init } from './Store/actions';
const App = () => {
  const [show, setShow] = React.useState(false)
  const [Name, setName] = React.useState("Home")
  
  const [Comp, setComp] = React.useState(React.lazy(() => import("./Screens/Comp/HomeComp")))
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    dispatch(Init())
  }, [])
  const HomeNav = () => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignSelf: "center",
        // justifyContent:"space-between",
        backgroundColor: COLORS.layout
      }}>
        <div style={{
          display: "flex",
          width: "100%",
          alignSelf: "center",
          // justifyContent:"space-between",
          backgroundColor: COLORS.layout
        }}>
     <SideNav show={show} setShow={setShow} Name={Name} setName={setName} setComp={setComp} />
        {
          show && <SideNavModal modalIsOpen={show} Name={Name} setName={setName} setIsOpen={setShow} setComp={setComp} />
        }
        <Home Comp={Comp} />
        </div>
      
    </div>
    )
  }
  
  
  const access = useSelector(state => state.Reducers.access)
  console.log(access)

  return (
    
        <Routes>
            {
                access===null?
            <Route exact path="/" element={<Login/>} />
            :
            <Route exact path="/" element={<HomeNav/>} />
            }
        </Routes>
      
  )
}

export default App;
