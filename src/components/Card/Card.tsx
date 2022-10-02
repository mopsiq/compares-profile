import { Component } from "solid-js";
import { S_Card, S_Block, S_Title } from "@app/components/styled/Card";
import { Divider } from "@hope-ui/solid";

export const Card: Component = () => {
  return (
    <>
      <S_Card>
        <S_Title>Title</S_Title>
        <Divider />
        <S_Block>12312</S_Block>
      </S_Card>
    </>
  );
};
