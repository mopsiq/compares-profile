import { styled } from "solid-styled-components";
import { JSX } from "solid-js";

interface InfoAvatar extends JSX.HTMLAttributes<HTMLDivElement> {
  position: string;
}

export const S_Profile = styled("div")`
  background-color: #20212f;
  color: #fff;

  padding: 10px 0;
  margin: 0 5px;
`;

export const S_Header = styled("div")`
  display: flex;
  align-items: center;

  padding: 0 15px;
  margin: 10px 0;
`;

export const S_Title = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;

  padding: 0 5px;
`;

export const S_Block = styled("div")`
  display: flex;
  margin: 15px;
`;

export const S_Profile_Title = styled("div")`
  width: 20%;
  text-align: center;
`;

export const S_Block_Divider = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  &::before,
  &::after {
    display: inline-block;
    content: "";
    width: 40%;
    height: 3px;
    background-color: #42455e;
  }
`;

export const S_Profile_Section = styled("div")``;

export const S_Info_Avatar = styled("div")((props: InfoAvatar) => ({
  display: "flex",
  justifyContent: props.position === "left" ? "flex-start" : "flex-end",
}));
