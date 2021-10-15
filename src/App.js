import MyForm from "./components/myform";
import Greetings from "./components/greetings";
import "./styles/theme/theme.scss";

function App() {
  return (
    <div className="page__wrap">
      <Greetings />
      <MyForm />
    </div>
  );
}
export default App;
