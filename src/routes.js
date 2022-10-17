import Registeration from "./pages/Registeration";
import ScreenTwo from "./pages/ScreenTwo";
import ScreenThree from "./pages/ScreenThree";
import BigPicture from "./pages/BigPicture";

export const routes = [
  {
    id: 1,
    path: "/",
    exact: true,
    element: <Registeration />,
  },
  {
    id: 2,
    path: "/screen2",
    exact: true,
    element: <ScreenTwo />,
  },
  {
    id: 3,
    path: "/screen3",
    exact: true,
    element: <ScreenThree />,
  },
  {
    id: 4,
    path: "/big-picture",
    exact: true,
    element: <BigPicture />,
  },
];
