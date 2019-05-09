import styled from "styled-components";
import { Button, Row, Card, Icon, Pagination } from "antd";

// const primary = "#3498db";
// const success = "#2ecc71";
// const warning = "#f1c40f";
// const danger = "#e74c3c";
// const light = "#ecf0f1";
// const dark = "#34495e";

export const GreenButton = styled(Button)`
  border-radius: 0px;

  /* Adapt the colors based on primary prop */
  background: ${props => (props.memorized ? "#2ecc71" : "white")};
  color: ${props => (props.success ? "white" : "#2ecc71")};
`;

export const TomatoButton = styled(GreenButton)`
  background: tomato;
  color: white;
  border-color: tomato;
  &:hover {
    background: #fff;
    color: tomato;
    transition: all 0.7s;
  }
  &:focus {
    background: tomato;
    color: #fff;
  }
`;

export const Container = styled(Row)`
  width: 70%;
  margin: 2% auto;
  padding: 10px;
  border: 2px solid #fff;
  border-radius: 0px;
  background: #282c34;
  max-height: 90vh;
  min-height: 90vh;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const CardStyled = styled(Card)`
  border-radius: 0px;
  border: 0px;
  width: 100%;
  margin: 1% auto;
  align-text: left;
  background: ${props => (props.memorized ? "#dfffdb" : "#fff")};
  border-left: ${props =>
    props.memorized ? "5px solid #529649" : "5px solid #b3b3b3"};
  transition: all 500ms;
`;
export const IconStyled = styled(Icon)`
  margin-left: 5px;
  color: ${props => (props.memorized ? "#529649" : "#333")};
`;

export const TitleCard = styled.span`
  color: ${props => (props.success ? "green" : "#333")};
`;

export const PaginationStyled = styled(Pagination)`
  float: right;
  margin-right: 20px;
  margin-top: 5px;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  height: 32px;
  width: 100%;
`;
