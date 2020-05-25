import React, { Component } from 'react';
import "../../style/_row.scss";


class Row extends Component {
    updateProduct=()=>{
        const {id, name, description, price}= this.props
        localStorage.setItem("id", id)
        localStorage.setItem("name", name )
        localStorage.setItem("description", description)
        localStorage.setItem("price", price)
        window.location.replace("http://localhost:3000/update")
    }
    deleteProduct=()=>{
        const id= this.props.id
        localStorage.setItem("id", id)
        window.location.replace("http://localhost:3000/delete");
      }
    
    render() { 
        const { id, name, description, image, price } = this.props
        return ( 
            <tr>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{description}</td>
                <td><img src={image} className={"img-table"} alt={name} /></td>
                <td>{price} kr</td>
                <td><button className="btn-update" onClick={this.updateProduct}>Update</button></td>
                <td><button className="btn-delete" onClick={this.deleteProduct}>Delete</button></td>
            </tr>
         );
    }
}
export default Row;
