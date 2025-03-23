import AuthGuard from "./auth/AuthGuard";
import MainLayout from "./layouts/mainLayout";
import AddCompany from "./pages/superadmin/addCompany";
import Login from "./pages/sessions/login";
import SuperDashboard from "./pages/superadmin/dashBoard/index";
import Trainings from "./pages/superadmin/training";
import AllCompanies from "./pages/superadmin/allCompanies";
// import AllPerson from "./pages/superadmin/allPerson";

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
      {
        path:"/superdashboard",
        element: <SuperDashboard />
      },
      
    ],
  },
  {
    path:"/trainings",
    element: <Trainings />
  },
  {
    path:"/add-company",
    element: <AddCompany />
  },
  {
    path:"/allcompanies",
    element: <AllCompanies />
  },
  
  {
    path: "/login",
    element: <Login />,
  },
];
