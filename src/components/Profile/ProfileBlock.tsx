import { Component, JSXElement } from "solid-js";
import {
  S_Block,
  S_Block_Divider,
  S_Profile_Title,
  S_Profile_Section,
} from "@app/components/styled/Profile";
interface ProfileBlockProps {
  title: string;
  children: Element | JSXElement;
}
export const ProfileBlock: Component<ProfileBlockProps> = (props) => {
  return (
    <S_Profile_Section>
      <S_Block_Divider>
        <S_Profile_Title>{props.title}</S_Profile_Title>
      </S_Block_Divider>
      <S_Block>{props.children}</S_Block>
    </S_Profile_Section>
  );
};
