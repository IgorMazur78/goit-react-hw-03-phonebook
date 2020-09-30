import React, { Component } from "react";
import uuid from "react-uuid";

import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import ListContact from "./Contact/ListContact";

export default class App extends Component {
  // создаем состояние класс АРР
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const contactWithLocalStorage = localStorage.getItem("contacts");
    if (contactWithLocalStorage !== null) {
      this.setState({
        contacts: JSON.parse(contactWithLocalStorage),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  // метод класса позволяющий при изменении значения записывать его в состояние state
  handelInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // метод позволяющий вносить изменения в state.contacts испльзуя state из другого класса
  // в данном случае из Form
  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    // name,number передаваемые состояния state из Form

    const newContact = {
      id: uuid(),
      name,
      number,
    };

    const prevContactName = contacts.some((e) => e.name === newContact.name);
    const prevContactNumber = contacts.some(
      (e) => e.number === newContact.number
    );

    if (prevContactName || prevContactNumber) {
      alert("such contact already exists");
      return;
    }
    if (!newContact.name || !newContact.number) {
      alert("enter data");
      return;
    }

  
    this.setState((prevState) => {
      if (newContact.name && newContact.number && prevContactNumber === false) {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      } 
      
    });

    // this.setState((prevState) => {
    //   if (newContact.name && newContact.number) {
    //     return {
    //       contacts: [...prevState.contacts, newContact],
    //     };
    //   } else if (
    //     contacts.some((e) => e.name === newContact.name) ||
    //     contacts.some((e) => e.number === newContact.number)
    //   ) {
    //     alert("such contact already exists");
    //     return {
    //       contacts: [...prevState.contacts],
    //     };
    //   } else {
    //     alert("maintains data");
    //     return {
    //       contacts: [...prevState.contacts],
    //     };
    //   }
    // });
  };
  deleteContact = (contactsId) => {
    console.log(contactsId);
    
    this.setState((prevState) => {
      
      return {
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactsId
        ),
      };
    });
  };

  showFilteredValue = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) => {
      const str = contact.name.toLowerCase();
      return str.includes(filter.toLowerCase());
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const showFilteredContacts = this.showFilteredValue();


    return (
      <div>
        <Form onhandleAddContact={this.handleAddContact} />

        <Filter value={filter} onChange={this.handelInputChange} />
        <div>
          <h2>Contacts</h2>

          {(contacts.length > 0 && showFilteredContacts.length > 0) && (
            <ListContact
              contact={this.showFilteredValue()}
              onDeleteContact={this.deleteContact}
            />
          ) 
          
          }
        </div>
      </div>
    );
  }
}
