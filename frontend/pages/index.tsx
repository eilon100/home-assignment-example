import Router from 'next/router';
import React, { useState } from 'react';
import Login from '../components/shared/login/Login';
import ModalContainer from '../UI/Modals/ModalContainer';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ModalContainer
        open={openModal}
        onClose={setOpenModal}
        children={<Login closeModal={setOpenModal} />}
      />
      <div className="w-full flex flex-col items-center p-3 rounded-b-2xl site-width text-center shadow-sm bg-white">
        <h3 className=" text-3xl">היי אורח</h3>
        <h1>קביעת תורים בכל מקום בכל זמן</h1>
        <h1>חיפוש עסק</h1>
        <div className="flex gap-2 text-xs text-gray-400">
          <h1>תנאי שירות</h1>
          <h1>מדיניות פרטיות</h1>
        </div>
        <button onClick={() => setOpenModal(true)}>התחברות</button>
        <button onClick={() => Router.push('/newbusiness')}>פתח משתמש</button>
      </div>
    </>
  );
}
