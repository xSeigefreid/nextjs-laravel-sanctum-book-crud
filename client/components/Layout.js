import Header from "./Header";
import Navbar from "./Navbar";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = process.env.apiKey;
axios.defaults.baseURL = process.env.url;
axios.defaults.headers.post['Accept'] = process.env.accept;
axios.defaults.headers.get['Accept'] = process.env.accept;

const Layout = props => (
    <div className="Layout">
        <Header />
        <Navbar />
        <div className="Content">
            { props.children }
        </div>
    </div>
);

export default Layout;
