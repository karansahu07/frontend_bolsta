import roles from "./constants/roles";

export const navigations = [
    {
        name : "Dashboard",
        icon : "bolsta",
        path : "/dashboard",
        auth : [roles.ADMIN]
    },
    {
        name : "Dashboard",
        icon : "bolsta",
        path : "/super-dashboard",
        auth : [roles.SUPER_ADMIN]
    },
    {
        name : "Trainings",
        icon : "training",
        path : "/trainings",
        auth : [roles.ADMIN , roles.SUPER_ADMIN, roles.STUDENT]
    },
    {
        name : "Add Person",
        icon : "addaccount",
        path : "/add-person",
        auth : [roles.ADMIN]
    },
    {
        name : "Add Company",
        icon : "person",
        path : "/add-company",
        auth : [roles.SUPER_ADMIN]
    },
    {
        name : "All Companies",
        icon : "companies",
        path : "/all-companies",
        auth : [roles.SUPER_ADMIN]
    },
    {
        name : "Persons",
        icon : "person",
        path : "/persons",
        auth : [roles.ADMIN]
    },
]