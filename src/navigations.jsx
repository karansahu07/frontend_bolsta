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
        path : "/superdashboard",
        auth : [roles.SUPER_ADMIN]
    },
    {
        name : "Trainings",
        icon : "training",
        path : "/trainings",
        auth : [roles.ADMIN , roles.SUPER_ADMIN, roles.STUDENT]
    },
    {
        name : "Add Account",
        icon : "addaccount",
        path : "/addaccount",
        auth : [roles.SUPER_ADMIN]
    },
    {
        name : "Add Person",
        icon : "person",
        path : "/addperson",
        auth : [roles.ADMIN]
    },
    {
        name : "Persons",
        icon : "person",
        path : "/persons",
        auth : [roles.ADMIN]
    },
]