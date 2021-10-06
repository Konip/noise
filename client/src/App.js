import { observer } from "mobx-react";
import React, { useContext, useState } from 'react';
import './App.css';
import Account from './components/Account/Account';
import { Body } from './components/Body/Body';
import Modal from './components/Modal/Modal';
import { NavBarVertical } from './components/NavBar/NavBarVertical';
import { Context } from "./Context";
import { startTransition } from "./utils/transition";

function App() {
  const ctx = useContext(Context)

  const [modalActive, setModalActive] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [page, setPage] = useState('body');

  const { isAuth, sounds, loadSounds, data, checkAuth } = ctx

  startTransition();
  // loadSounds()

  // console.log('data------', data);

  const openModal = (activeModal, typeModal) => {
    console.log(activeModal, typeModal);
    setModalActive(activeModal)
    setTypeModal(typeModal)
  }

  return (
    <div className="App">
      {console.log('App')}
      <NavBarVertical isAuth={ctx.isAuth} checkAuth={ctx.checkAuth}
        logout={ctx.logout} openModal={openModal} setPage={setPage}
      />

      <div style={page === 'body' ? { zIndex: '600', display: 'block' } : { zIndex: '1', display: 'none' }}>
        <Body openModal={openModal} type={typeModal}
          isAuth={isAuth} setPage={setPage}
        />
      </div>

      {page === 'account' && ctx.isAuth ?
        <div style={page === 'account' && ctx.isAuth ? { zIndex: '600', display: 'block' } : { zIndex: '1', display: 'none' }}>
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

  // return (
  //   <div className="App">
  //     {console.log('App')}
  //     <NavBarVertical isAuth={ctx.isAuth} checkAuth={ctx.checkAuth}
  //       logout={ctx.logout} openModal={openModal} setPage={setPage}
  //     />
  //     {
  //       page === 'body' ?
  //         <Body openModal={openModal} type={typeModal}
  //           isAuth={isAuth} setPage={setPage}
  //         />
  //         : page === 'account' && ctx.isAuth ?
  //           <Account openModal={openModal} setPage={setPage} />
  //           :
  //           <div></div>
  //     }
  //     <Modal openModal={openModal} active={modalActive} setActive={setModalActive} type={typeModal} registration={ctx.registration}
  //       login={ctx.login} email={ctx.email} isAuth={isAuth}
  //     />
  //   </div>
  // );

}

export default observer(App);
