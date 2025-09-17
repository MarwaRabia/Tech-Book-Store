import CategoriesSection from "../Component/CategoriesSection";
import { Outlet } from "react-router-dom";
const categories = [
  {
    id: 1,
    title: "JavaScript",
    imgURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
  },
  {
    id: 2,
    title: "PHP",
    imgURL: "https://www.php.net/images/meta-image.png",
  },
  {
    id: 3,
    title: "CSS",
    imgURL: "https://img.freepik.com/free-icon/file-formats_318-337962.jpg",
  },
  {
    id: 4,
    title: "React.JS",
    imgURL:
      "https://cdn.iconscout.com/icon/free/png-512/free-react-1-282599.png?f=avif&w=256",
  },
  {
    id: 5,
    title: "Python",
    imgURL:
      "https://www.pngitem.com/pimgs/m/31-312064_programming-icon-png-python-logo-512-transparent-png.png",
  },
  {
    id: 6,
    title: "GraphQL",
    imgURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfOg0zPZIeu6lxMmLS1jYnE3lxamE0OD3WUo6paRseem3H6i1Bykie6TFiXxXzmqVLBM&usqp=CAU",
  },
];

function Home() {
  return (
  <div className="page-content">
  <CategoriesSection categories={categories} />
  </div>
) ;
}

export default Home;
