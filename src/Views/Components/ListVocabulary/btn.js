import React, { useState } from "react";
import { IconStyled, CardStyled, TitleCard } from "../Styled";
import { Modal, Icon } from "antd";
import { connect } from "react-redux";
import { ChangeMemorizedRequest } from "../../../Actions/index";

const confirm = Modal.confirm;
// const responsiveVoice = require("responsiveVoice");
//delete confirm
const showDeleteConfirm = (id, props) => {
  confirm({
    title: "Are you sure delete this word?",
    content: null,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      props.onDeleteWord(id);
    },
    onCancel() {}
  });
};

const BTN = props => {
  let [show, setShow] = useState(false);
  let word = props.d;
  // console.log(d);
  const extra = word => {
    let isMemorized = {
      isMemorized: !word.isMemorized
    };
    return (
      <span>
        <IconStyled
          onClick={() => {
            setShow(!show);
          }}
          type={show ? "eye" : "eye-invisible"}
          theme="filled"
        />
        <IconStyled
          onClick={() =>
            props.onChangeMemorized(Object.assign(word, isMemorized))
          }
          type={word.isMemorized ? "close-square" : "check-square"}
          theme="filled"
        />
        <IconStyled
          type="edit"
          theme="filled"
          onClick={() => props.showModal(word)}
        />
        <IconStyled
          type="delete"
          theme="filled"
          onClick={() => showDeleteConfirm(word.id, props.props)}
        />
      </span>
    );
  };

  let StringToArray = word.VN.split(" ");
  let x = "";
  StringToArray.forEach(element => {
    x += "__ ".repeat(element.length) + "     ";
  });

  return (
    <CardStyled
      title={
        <TitleCard success={word.isMemorized}>
          <Icon
            type="sound"
            theme="filled"
            onClick={() => {
              window.responsiveVoice.speak(word.EN);
            }}
          />{" "}
          &nbsp;
          {word.EN}
        </TitleCard>
      }
      extra={extra(word)}
      size="small"
      memorized={word.isMemorized ? "memorized" : ""}
    >
      <span style={{ fontWeight: 700, whiteSpace: "pre" }}>
        {show ? word.VN : x}
      </span>
    </CardStyled>
  );
};

const mapStateToProps = state => {
  return {
    data: state.vocabulary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeMemorized: data => {
      dispatch(ChangeMemorizedRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BTN);
