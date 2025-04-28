import Auth from "./middleware/Auth";
import Public from "./middleware/Public";
import UsrModule from "./middleware/UsrModule";

const routes = [
  //public
  {
    path: "/iniciar_sesion",
    name: "login",
    component: () => import("@/views/public/UserLogin.vue"),
    meta: {
      title: "Iniciar Sesión",
      middleware: Public,
    },
  },
  //module
  {
    path: "/modulo/consultas",
    name: "module/consultations",
    component: () => import("@/views/module/Consultations.vue"),
    meta: {
      title: "Consultas",
      icon: "mdi-medical-bag",
      middleware: UsrModule,
    },
  },
  {
    path: "/modulo/consultas/:id",
    name: "module/consultations/update",
    component: () => import("@/views/module/ConsultationsUpdate.vue"),
    meta: {
      title: "Consulta",
      icon: "mdi-medical-bag",
      middleware: UsrModule,
    },
    props: true,
  },
  //general
  {
    path: "/",
    name: "main",
    component: () => import("@/views/general/Main.vue"),
    meta: {
      title: "SOLMETEC",
    },
  },
  {
    path: "/no_autorizado",
    name: "unauthorized",
    component: () => import("@/views/general/Unauthorized.vue"),
    meta: {
      title: "Acceso Denegado",
      middleware: Auth,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: () => import("@/views/general/NotFound.vue"),
  },
];

export default routes;
