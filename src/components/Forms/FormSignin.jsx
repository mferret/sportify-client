import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import TextField from '@material-ui/core/TextField';
import SubmitBtn from "../buttons/SubmitBtn";
import Password from "../buttons/Password";




class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",

  };



  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };



  render() {

    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
       {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

      
       <label htmlFor="email"></label>
       <TextField id="email" name="email" label="Email" variant="outlined" />

        {/* <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" /> */}

        <Password />

        {/* <label htmlFor="password"></label>
       <TextField id="password" name="password" label="Mot de passe" variant="outlined" /> */}

        {/* <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" /> */}

        <SubmitBtn />

  
      </form>
    );
  }
}

export default withRouter(FormSignin);
