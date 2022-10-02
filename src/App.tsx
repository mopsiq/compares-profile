import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { Home } from "@app/pages/Home/Home";
import { Profile } from "@app/pages/Profile/Profile";
import { Header } from "@app/components/Header/Header";
import { S_Container } from "@app/components/styled/Container";

const App: Component = () => {
  return (
    <>
      <Header />
      <S_Container>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </Routes>
      </S_Container>
    </>
  );
};

export default App;
