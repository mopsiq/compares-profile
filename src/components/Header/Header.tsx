import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {
  S_Header,
  S_Group,
  S_Item,
  S_Link,
} from "@app/components/styled/Header";

export const Header: Component = () => {
  const navigator = useNavigate();

  const navigateTo = (path: string) => {
    return navigator(path, { replace: true });
  };

  return (
    <S_Header>
      <S_Group>
        <S_Item>
          <S_Link>Logo</S_Link>
        </S_Item>
      </S_Group>
      <S_Group>
        <S_Item>
          <S_Link onClick={() => navigateTo("/")}>Home</S_Link>
        </S_Item>
        <S_Item>
          <S_Link onClick={() => navigateTo("/compare")}>Compare</S_Link>
        </S_Item>
      </S_Group>
    </S_Header>
  );
};
