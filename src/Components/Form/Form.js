import React, { Component } from "react";
import style from "./Form.module.css"

export default class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handelInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handelSubmit = (evt) =>{
      evt.preventDefault();

    
      {this.props.onhandleAddContact(this.state.name,this.state.number)}// метод передаваемий из Арр
      this.setState({name:"",number: ""})//обнуление строки после ввода данных
  }

  render() {
    const { name, number } = this.state;

    return (
      <div className = {style.formStyle}>
        <h2 className = {style.formStyleTitle}>Phonebook</h2>
        <form className = {style.formStyleFormInput} onSubmit={this.handelSubmit}>
          <label>
            Name
            <br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handelInputChange}
              placeholder="Add name"
              autoFocus
            ></input>
            <br />
          </label>
          <label>
            Number
            <br />
            <input
              type="text"
              name="number"
              value={number}
              onChange={this.handelInputChange}
              placeholder="Add number"
              autoFocus
            ></input>
          </label>
          <br />
          <button className = {style.formStyleFormButton} type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}
