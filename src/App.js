import CategoriesSection from "./Component/CategoriesSection";

const categories = [
  { id: 1, title: "JavaScript", imageUrl: "" },
  { id: 2, title: "Python", imageUrl: "" },
  { id: 3, title: "PHP", imageUrl: "" },
  { id: 4, title: "GraphQL", imageUrl: "" },
  { id: 5, title: "React.JS", imageUrl: "" },
  { id: 6, title: "CSS", imageUrl: "" },
];

function App() {
  return (
   <CategoriesSection categories={categories}/>
  );
}

export default App;
