import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import App from '../App';
import Home from '../pages/Home';
import AdminHome from '../pages/admin/AdminHome';
import Dashboard from '../pages/admin/Dashboard';
import ManageAgents from '../pages/admin/ManageAgents';
import ProtectedRoute from '../components/ProtectedRoute';
import UploadTask from '../pages/admin/UploadTaskPage';

const routers = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Register />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )
          },
          {
            path: 'agents',
            element: (
              <ProtectedRoute>
                <ManageAgents />
              </ProtectedRoute>
            )
          },
          {
            path : 'upload-tasks',
            element : (
              <ProtectedRoute>
                <UploadTask/>
              </ProtectedRoute>
            )
          }
        ]
      }

      // other routes can go here
    ],
  },
]);

export default routers;
