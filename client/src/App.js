import { observer } from "mobx-react";
import React, { useContext, useState } from 'react';
import './App.css';
import Account from './components/Account/Account';
import { Body } from './components/Body/Body';
import Modal from './components/Modal/Modal';
import { NavBar } from "./components/NavBar/NavBar";
import { Context } from "./Context";


function App() {
  const ctx = useContext(Context)

  const [modalActive, setModalActive] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [page, setPage] = useState('body');

  const { isAuth } = ctx

  // startTransition();

  const openModal = (activeModal, typeModal) => {
    setModalActive(activeModal)
    setTypeModal(typeModal)
  }

  return (
    <div className="App">
      <NavBar openModal={openModal} setPage={setPage} page={page}
      />

      <div style={page === 'body' ? { zIndex: '50', display: 'block' } : { zIndex: '1', display: 'none' }}>
        <Body openModal={openModal} type={typeModal}
          isAuth={isAuth} setPage={setPage}
        />
      </div>

      {page === 'account' && isAuth ?
        <div style={page === 'account' && ctx.isAuth ? { zIndex: '50', display: 'block' } : { zIndex: '1', display: 'none' }}>
          <Account openModal={openModal} setPage={setPage} />
        </div>
        :
        <div></div>
      }

      <Modal openModal={openModal} active={modalActive} setActive={setModalActive} type={typeModal} registration={ctx.registration}
        login={ctx.login} email={ctx.email} isAuth={isAuth}
      />
    </div>
  );
}

export default observer(App);
