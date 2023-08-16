import React from 'react';

function AdminNavBar() {
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-full flex justify-between p-5 ">
        <h1>findMyBarber</h1>
        <div className="flex gap-2 site-width">
          <p>מספרות באזורך</p>
          <h1>יומן</h1>
          <h1>סטטיסטיקה</h1>
          <h1>לקוחות</h1>
          <h1>שירותים</h1>
          <h1>צוות</h1>
          <h1>שעות פעילות</h1>
          <h1>הודעות</h1>
          <h1>הגדרות</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default AdminNavBar;
