import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import 
{ DISPLAY_ALERT,
   CLEAR_ALERT, 
   REGISTER_USER_BEGIN, 
   REGISTER_USER_ERROR, 
   REGISTER_USER_SUCCESS,
   LOGIN_USER_BEGIN,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_ERROR,
   TOGGLE_SIDEBAR,
   LOGOUT_USER,
   UPDATE_USER_BEGIN,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_ERROR,
   HANDLE_CHANGE,
   CLEAR_VALUES,
   CREATE_JOB_BEGIN,
   CREATE_JOB_ERROR,
   CREATE_JOB_SUCCESS
  } from "./action"
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false, 
  editJobId:'',
  position:'',
  company:'',
  jobLocation: userLocation || '',  
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',

}
const AppContext = React.createContext()
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  const authFetch = axios.create({
    baseURL : '/api/v1',
  })

  authFetch.interceptors.request.use((config) => {
    
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  authFetch.interceptors.response.use((response) => {
    
    return response
  },
  (error) => {
    console.log(error.response);
    if(error.response.status === 401){
      logoutUser();
    }
    return Promise.reject(error)
  }
)




  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert();
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 3000)
  }
  const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token);
    localStorage.setItem('location', location)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }
  const registerUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser);
      // console.log(response);
      const { user, token, location } = await response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      })
      addUserToLocalStorage({user, token, location})
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: 'Something went Wrong' }
      })
    }
    clearAlert();
  }

  const loginUser = async(currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
     
      const { user, token, location } = await response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      })
      addUserToLocalStorage({user, token,location})
    } catch (error) {
    
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: 'Something went Wrong' }
      })
    }
    clearAlert();
  }

  const toggleSidebar = () => {
    dispatch({type : TOGGLE_SIDEBAR})
  }
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage();
  }
  const updateUser = async (currentUser) => {
    dispatch({type: UPDATE_USER_BEGIN})
    try{
      const {data} = await authFetch.patch('/auth/updateUser', currentUser)
      const {user, location, token} = data;
      dispatch({type: UPDATE_USER_SUCCESS, payload:{user, location, token}})
      // console.log(data);
      addUserToLocalStorage({user, location, token});
    }catch(error){
      // console.log(error);
      if(error.response.status !== 401){
        dispatch({type: UPDATE_USER_ERROR, payload: {msg : error.response.data.msg}})
      }
    }
    clearAlert();
  }
  
  const handleChange = ({name, value}) => {
    dispatch({type : HANDLE_CHANGE, payload : {name, value}})
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const createJob = async () => {
    dispatch({type: CREATE_JOB_BEGIN})
    try{
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({
        type: CREATE_JOB_SUCCESS,
      })
      clearValues();
    }
    catch(error){
      if(error.response.status === 401) return;
      dispatch({type: CREATE_JOB_ERROR, payload : {msg : error.response.data.msg}})
    }
    clearAlert()
  }
  
  return (
    <AppContext.Provider
      value={{
        ...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser,
        handleChange, clearValues, createJob
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }