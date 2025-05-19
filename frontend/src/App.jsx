
import { Outlet } from 'react-router-dom'
import useAuthStore from './zustand/authStore'
import { useEffect } from 'react'

const App = () => {
  const { checkAuth, user } = useAuthStore();

  useEffect(() => {
    if (!user) checkAuth();
  }, []);

  return (
    <div>
      {/* <Navbar user={user} /> */}
      <Outlet />
    </div>
  );
};
export default App;