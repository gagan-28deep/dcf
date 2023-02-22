import "./App.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./Components/Navigationbar/navigationbar";
import Footer from "./Components/Footer/footer";
import Routing from "./Config/routes";

function App() {
  console.log(
    "window.location.pathname",
    window.location.pathname.split("/")[1]
  );
  if (
    window.location.pathname.split("/")[1] !== "master" &&
    window.location.pathname.split("/")[1] !== "admin-signin"
  ) {
    return (
      <div className="App">
        <Navigationbar />
        <Routing />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routing />
      </div>
    );
  }
}

export default App;
