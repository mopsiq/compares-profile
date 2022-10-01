import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { Home } from "@app/pages/Home/Home";
import { Profile } from "@app/pages/Profile/Profile";
import { Header } from "@app/components/Header/Header";

const App: Component = () => {
  return (
    <>
      <Header />
      <br />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </>
  );
};

export default App;
