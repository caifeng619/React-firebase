import React, { Component } from "react";
import Card from "./Card";
import Step from "./Step";
import Header from "./Header";
import Footer from "./Footer";
import "../style/_card.scss";
import axios from "axios";

class App extends Component {
    state = {
        products: []
    }
    componentDidMount() {
        axios.get("http://localhost:1337/products")
            .then((res) => {
                console.log(res)
                this.setState({
                    products: res.data
                })
            })
    }
    componentDidUpdate(){
        console.log("component did update.")
    }
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Step/>
                <div className="card-container">
                    {(this.state.products.map(
                        product =>
                            <Card
                                key={product.id}
                                docId={product.id}
                                name={product.name}
                                description={product.description}
                                image={"http://localhost:1337"+product.image.url}
                                price={product.price}
                            />
                    ))}
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}


export default App;