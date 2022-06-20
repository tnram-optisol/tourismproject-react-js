import * as React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "routes/routes";


import "./App.css";


export default function App() {
  return (
    <>
      <section>
        <Router>
          <MyRoutes/>
        </Router>
      </section>
    </>
  );
}
