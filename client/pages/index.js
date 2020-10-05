import Layout from "../components/Layout";

const Index = () => (
    <Layout>
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4"/>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p> Url: { process.env.url } </p>
                <p> Key: { process.env.apiKey } </p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" role="button">Learn more</a>
                </p>
            </div>
        </div>
    </Layout>

);

export default Index;