import Content from "./Content/Content";
import Header from "./Header/Header";
import "./Layout.css";
import Navigate from "./Navigate/Navigate";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <Header />
            {/* <Navigate /> */}
            <Content />
        </div>
    );
}

export default Layout;
