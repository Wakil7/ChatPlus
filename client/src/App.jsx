import './App.css'
import { Toaster } from 'react-hot-toast'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Login } from './store/slice/user/user.slice';
import { getUserProfileThunk} from './store/slice/user/user.thunk'


function App() {

  // const state = useSelector(state=>state.userReducer)
  const dispatch = useDispatch();
  // // console.log(state)

  // useEffect(()=>{
  //   dispatch(loginUserThunk());
  // })

  useEffect(()=>{
    (async()=>{
      dispatch(getUserProfileThunk());
    })();
    
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default App
