import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
  };
  return (
    <form onSubmit={submit} class="login-form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
