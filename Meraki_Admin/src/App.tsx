import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './Routes/public/PublicRoutes';
import { privateRoutes } from './Routes/private/PrivateRoutes';
import { useQuery } from '@tanstack/react-query';
import { getMeQuery } from './services/AuthApi';
import { useAuth } from './Hooks/ProviderHooks/useAuth';

function App() {
  const { setUser, user } = useAuth();
  const [showComponent, setShowComponent] = useState(false)

  const { isLoading: loading } = useQuery({
    queryKey: ['user'],
    queryFn: getMeQuery,
    onSuccess(data) {
      console.log(data, 'data');
      setUser(data);
    },
  });


  const router = createBrowserRouter(!user ? privateRoutes : publicRoutes);

  useEffect(() => {
    const toRef = setTimeout(() => {
      setShowComponent(true);
      clearTimeout(toRef);
      // it is good practice to clear the timeout (but I am not sure why)
    }, 3000)
  }, [user]);

  if (loading && !showComponent) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1>loading....</h1>
      </div>
    );
  }
  return <div>
    {showComponent &&
      <RouterProvider router={router} />
    }
  </div>;

}
export default App
