import React, { Component } from "react";
import axios from "axios";
import Row from "./Row";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../../style/_getProducts.scss";
import Forbidden from "./Forbidden";

class GetProducts extends Component {
  state = {
    products: [],
    pageList:[],
    currentPage:1,
    numberPerPage:5,
    numOfPages:Math.ceil(localStorage.getItem("numOfProducts")/5)
  };

  componentDidMount() {
    const loggedIn=this.state.token || localStorage.getItem("token")
    if(!!loggedIn){
      axios.get("http://localhost:1337/products").then((res) => {
        this.setState({
          products: res.data
        });
        let numOfProducts=res.data.length
        localStorage.setItem("numOfProducts", numOfProducts)
        this.loadList()
      })
    }
  }
  componentDidUpdate() {
    console.log("component did update.");
  }

  firstPage(){
      this.setState({
          currentPage:1
      }, ()=>this.loadList())
  }
  nextPage(){
      this.setState(prevState=>({
          currentPage:prevState.currentPage + 1
      }), ()=>this.loadList())
      console.log("currentpage", this.state.currentPage)
  }
  previousPage(){
      this.setState(prevState=>({
        currentPage:prevState.currentPage - 1
      }), ()=>this.loadList())
      console.log("currentpage", this.state.currentPage)
  }
  LastPage(){
      this.setState({
          currentPage:this.state.numOfPages
      }, ()=>this.loadList())
      
  }
  loadList(){
      var begin = (this.state.currentPage - 1) * this.state.numberPerPage
      var end = begin + this.state.numberPerPage
      this.setState({
        pageList:this.state.products.slice(begin, end)
      })
      this.check()
  }

  check() {
    document.getElementById("next").disabled = this.state.currentPage === this.state.numOfPages ? true : false;
    document.getElementById("previous").disabled = this.state.currentPage === 1 ? true : false;
    document.getElementById("first").disabled = this.state.currentPage === 1 ? true : false;
    document.getElementById("last").disabled = this.state.currentPage === this.state.numOfPages ? true : false;
  }

  render() {
    const loggedIn=this.state.token || localStorage.getItem("token")
    return (
      <React.Fragment>
        {
          !loggedIn 
          ? <Forbidden/>
          : <div className="page-container">
                <AdminHeader />
                <div className="table-container table-responsive-sm">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Image</th>
                      <th scope="col">Price</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pageList.map((product) => (
                      <Row
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        image={"http://localhost:1337" + product.image.url}
                        price={product.price}
                      />
                    ))}
                  </tbody>
                </table>
                </div>
                <div className="pagination">
                          <button id="first" onClick={this.firstPage.bind(this)}>First</button>
                          <button id="next" onClick={this.nextPage.bind(this)}>Next</button>
                          <button id="previous" onClick={this.previousPage.bind(this)}>Previous</button>
                          <button id="last" onClick={this.LastPage.bind(this)}>Last</button>
                </div>
                <AdminFooter/>
            </div>
        }
      </React.Fragment>
    );
  }
}

export default GetProducts;
