import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { Home } from "@app/pages/Home/Home";
import { Compare } from "@app/pages/Compare/Compare";
import { Header } from "@app/components/Header/Header";
import { S_Container } from "@app/components/styled/Container";

const App: Component = () => {
  return (
    <>
      <Header />
      <S_Container>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/compare" component={Compare} />
        </Routes>
      </S_Container>
    </>
  );
};

export default App;
