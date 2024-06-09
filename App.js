import React, { Suspense } from 'react'
import RootLayout from './Components/RootLayout'
import Home from './Components/Home'
import Signin from './Components/Signin'
import SignUp from './Components/SignUp'
import About from './Components/About'
import UserProfile from './Components/UserProfile'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import AuthorProfile from './Components/AuthorProfile'
import { lazy } from 'react'
import Articles from './Components/articles/Articles';

// import AddArticle from './Components/add-article/AddArticle';
import ArticlesByAuthor from './Components/articles-by-author/ArticlesByAuthor';
import Article from './Components/article/Article';
import ErrorPage from './Components/ErrorPage'
const AddArticle =lazy(()=>import('./Components/add-article/AddArticle'))
function App() {
  let router=createBrowserRouter([
    {
        path:'',
        element:<RootLayout/>,
        errorElement:<ErrorPage/>,
        children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path :'about',
          element:<About/>
        },
        {
          path:'Signin',
          element:<Signin/>
        },
        {
          path:'SignUp',
          element:<SignUp/>
        },
        {
          path:"user-profile",
          element:<UserProfile/>,
          children:[
            {
              path:"articles",
              element:<Articles />
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            {
              path:'',
              element:<Navigate to='articles' />
            }
          ]
        },
        {
          path:"author-profile",
          element:<AuthorProfile/>,
          children:[
            {
              path:'new-article',
              element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
            },
            {
              path:'articles-by-author/:author',
              element:<ArticlesByAuthor />,
             
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            {
              path:'',
              element:<Navigate to='articles-by-author/:author' />
            }
          ]
        }
  ]}
])
  return (
    
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
