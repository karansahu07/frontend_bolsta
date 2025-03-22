import AuthGuard from "./auth/AuthGuard";
import MainLayout from "./layouts/mainLayout";
import AddCompany from "./pages/addCompany";
import Login from "./pages/sessions/login";

export const routes = [
   {
      path:"/",
      element: <h1 className="text-4xl text-amber-300">Homepage</h1>
   },
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard",
        element: <h1 className="text-2xl text-red-950">Dahsboard</h1>,
      },
    ],
  },
  {
    path:"/add-company",
    element: <AddCompany />
  },
  {
    path: "/login",
    element: <Login />,
  },
];
