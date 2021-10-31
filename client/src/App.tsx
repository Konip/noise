import { observer } from "mobx-react";
import React, { useContext, useState } from 'react';
import './App.css';
import Account from './components/Account/Account';
import { Body } from './components/Body/Body';
import Modal from './components/Modal/Modal';
import NavBar from "./components/NavBar/NavBar";
import { Context } from "./Context.js";

function App() {

  const [modalActive, setModalActive] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [page, setPage] = useState('body');

  const ctx = useContext(Context)
  const { isAuth, email }: { isAuth: boolean, email: string } = ctx

  // startTransition();

  const openModal = (activeModal: boolean, typeModal: string) => {
    setModalActive(activeModal)
    setTypeModal(typeModal)
  }

  return (
    <div className="App" >
      <NavBar openModal={openModal} setPage={setPage} page={page}
      />

      <div style={page === 'body' ? { zIndex: 50, display: 'block' } : { zIndex: 1, display: 'none' }}>
        <Body openModal={openModal} type={typeModal}
          isAuth={isAuth} setPage={setPage}
        />
      </div>

      {
        page === 'account' && isAuth ?
          <div style={page === 'account' && isAuth ? { zIndex: 50, display: 'block' } : { zIndex: 1, display: 'none' }}>
            <Account openModal={openModal} setPage={setPage} />
          </div>
          :
          <div></div>
      }

      <Modal openModal={openModal} active={modalActive} setActive={setModalActive} type={typeModal}
        email={email}
      />
    </div>
  );
}

export default observer(App);
