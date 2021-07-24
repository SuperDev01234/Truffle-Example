import React, { useEffect, useState } from "react";
import "../styles/MainLayout.css";
import { Icon, InlineIcon } from "@iconify/react";
import ethereumIcon from "@iconify-icons/mdi/ethereum";

import { portis } from "../services/web3";
import Sidebar from "../components/Sidebar";

function MainLayout(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    onLogin();
    checkLoggedIn();
  }, []);

  async function onLogin() {
    portis.onLogin((wallet, email, reputation) => {
      console.log(wallet, email, reputation);
      setWallet(wallet);
      setEmail(email);
    });
  }

  async function checkLoggedIn() {
    await portis.isLoggedIn().then(({ error, result }) => {
      // console.log(error, result);
      setIsLoggedIn(result);
    });
  }

  async function showPortis() {
    await portis.showPortis();
    onLogin();
    checkLoggedIn();
  }

  return (
    <div className="main__layout">
      <Sidebar
        showPortis={showPortis}
        isLoggedIn={isLoggedIn}
        setWallet={setWallet}
        setIsLoggedIn={setIsLoggedIn}
        wallet={wallet}
        email={email}
      />

      {props.children}
    </div>
  );
}

export default MainLayout;
