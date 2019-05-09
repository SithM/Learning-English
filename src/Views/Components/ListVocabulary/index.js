import React, { useState, useEffect } from "react";
import {
  GetAllVocabularyRequest,
  ChangeVNRequest,
  DeleteWordRequest,
  AddWordRequest,
  GetSizeRequest
} from "../../../Actions/index";
import { connect } from "react-redux";
import {
  Container,
  CardStyled,
  TomatoButton,
  PaginationStyled,
  Footer
} from "../Styled/index";
import { Modal, Input, Empty, Icon } from "antd";
import lifecycle from "react-pure-lifecycle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import BTN from "./btn";
var randomstring = require("randomstring");

const methods = {
  componentWillMount(props) {
    props.onGetVocabulary(1);
    props.onGetSize("all");
  }
};

const PAGE_SIZE = 5;

const ListVocabulary = props => {
  let { data, size } = props;
  // console.log(size);
  //useState in React-Hooks (v React 16.8)
  //you can see document in https://reactjs.org/docs/hooks-intro.html
  const [visible, setVisible] = useState(false);
  const [word, setWord] = useState({
    id: "",
    EN: "",
    VN: "",
    isMemorized: false
  });
  const [valueEN, setValueEN] = useState("");
  const [valueVN, setValueVN] = useState("");
  const [fillter, setFillter] = useState("all");
  const [page, setPage] = useState(1);

  //useEffect work similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    props.onGetVocabulary(1, fillter);
    props.onGetSize(fillter);
  }, [fillter]); //work when update filter

  //show modal edit word and add word
  const showModal = d => {
    setVisible(true);
    setWord(d);
    if (d.id) {
      setValueEN(d.EN);
      setValueVN(d.VN);
    }
  };

  //show list word from database
  let theShowVocabulary = data => {
    let result;
    if (data.length > 0) {
      result = data.map(d => {
        return (
          <div key={d.id}>
            <BTN d={d} showModal={() => showModal(d)} props={props} />
          </div>
        );
      });
    }
    if (data.length === 0)
      result = (
        <CardStyled title={null} size="small">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </CardStyled>
      );
    return result;
  };

  //reset form after action
  //close all modal in page
  const resetValue = () => {
    setVisible(false);
    setWord({
      id: "",
      EN: "",
      VN: "",
      isMemorized: false
    });
    setValueEN("");
    setValueVN("");
  };

  //act adit word
  const onChangeWord = () => {
    let newValue = {
      id: word.id ? word.id : randomstring.generate(8),
      EN: valueEN === "" ? word.EN : valueEN,
      VN: valueVN,
      isMemorized: word.isMemorized ? word.isMemorized : false
    };
    //if id this word has existed --> edit this word
    //else create a new word
    if (word.id) {
      props.onChangeVN(newValue);
    } else {
      props.onAddWord(newValue);
      //when you add a word, you'll go to the last page where the word you just created
      if (page !== Math.ceil(size / PAGE_SIZE)) {
        props.onGetVocabulary(Math.ceil(size / PAGE_SIZE), fillter);
        setPage(Math.ceil(size / PAGE_SIZE));
      }
    }

    resetValue();
  };

  //get word by page
  const onChangePage = page => {
    //console.log(page);
    setPage(page);
    props.onGetVocabulary(page, fillter);
  };

  return (
    <Container>
      <TomatoButton onClick={() => showModal(word)} type="primary">
        <Icon type="plus" /> Add Word
      </TomatoButton>
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {theShowVocabulary(data)}
      </ReactCSSTransitionGroup>
      <Modal
        title={`Edit for ${word.EN}`}
        visible={visible}
        onOk={() => onChangeWord()}
        onCancel={() => {
          resetValue();
        }}
      >
        <Input value={valueEN} onChange={e => setValueEN(e.target.value)} />
        <br />
        <Input value={valueVN} onChange={e => setValueVN(e.target.value)} />
      </Modal>
      <Footer>
        <TomatoButton
          onClick={() => {
            setFillter("all");
            setPage(1);
          }}
          type="primary"
        >
          Show all
        </TomatoButton>{" "}
        &nbsp;
        <TomatoButton
          onClick={() => {
            setFillter("true");
            setPage(1);
          }}
          type="primary"
        >
          Fillter Memorized
        </TomatoButton>{" "}
        &nbsp;
        <TomatoButton
          onClick={() => {
            setFillter("false");
            setPage(1);
          }}
          type="primary"
        >
          Fillter Forget
        </TomatoButton>
        <PaginationStyled
          current={page}
          defaultPageSize={5}
          total={Math.ceil(size / PAGE_SIZE) * 5}
          onChange={value => onChangePage(value)}
        />
      </Footer>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    data: state.vocabulary,
    size: state.DataSize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetVocabulary: (page, type) => {
      dispatch(GetAllVocabularyRequest(page, type));
    },
    onGetSize: type => {
      dispatch(GetSizeRequest(type));
    },
    onChangeVN: data => {
      dispatch(ChangeVNRequest(data));
    },
    onDeleteWord: id => {
      dispatch(DeleteWordRequest(id));
    },
    onAddWord: data => {
      dispatch(AddWordRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(lifecycle(methods)(ListVocabulary));
