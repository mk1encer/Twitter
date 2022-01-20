import React, { useState } from "react";
import auth from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        try {
          data = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
          alert("계정 등록 실패! 다른 이메일/비밀번호로 다시 시도하세요.");
        }
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    let provider;
    const {
      target: { name },
    } = event;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
