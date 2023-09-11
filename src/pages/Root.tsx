import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <section>
      <h1>This is main</h1>
      <Outlet />
    </section>
  );
}
