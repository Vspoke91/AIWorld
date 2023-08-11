import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import './main.css'
import LayoutComponent from './components/Layout/Layout'
import HomePage from './pages/home/Home'
import SearchPage from './pages/search/Search'
import FeedbackPage from './pages/feedback/Feedback'
import AboutPage from './pages/about/About'
import ErrorPage from './pages/error/Error'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayoutComponent/>} >
      <Route index element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/feedback' element={<FeedbackPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='*' element={<ErrorPage/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
