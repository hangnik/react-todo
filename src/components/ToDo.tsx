import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
//import { BsCheck } from "react-icons/bs";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 0px 40px;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  li {
    display: flex;
    justify-content: space-between;
    list-style: none;
    border-bottom: 1px solid #c4c0c0;
    padding: 20px 10px;
    color: ${(props) => props.theme.textColor};
  }
  :last-child > li {
    border-bottom: none;
  }
  :nth-child(3) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const ToDoContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    background-color: #ececec;
    border: none;
    border-radius: 6px;
    width: 24px;
    height: 24px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #e4e4e4;
    }
    &:focus {
      background-color: ${(props) => props.theme.accentColor};
      //background-image: url("");
    }
  }
  span {
    font-size: 16px;
    margin-left: 10px;
  }
`;

const ToDoBtn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    border: none;
    border-radius: 10px;
    width: 52px;
    height: 31px;
    font-size: 10px;
    font-weight: 600;
    margin: 0 5px;
    font-weight: bold;
  }
  button:first-child {
    background-color: #d6d2c4;
    color: #3d3d3d;
    &:hover {
      background-color: #c8c5bb;
    }
  }
  button:last-child {
    background-color: #f7dad9;
    color: ${(props) => props.theme.accentColor};
    &:hover {
      background-color: #fdd5d4;
    }
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onClickDel = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDos) => oldToDos.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Wrapper>
      <li>
        <ToDoContent>
          {category !== Categories.DONE && (
            <button name={Categories.DONE} onClick={onClick}></button>
          )}
          <span>{text}</span>
        </ToDoContent>
        <ToDoBtn>
          {category !== Categories.TODO && (
            <button name={Categories.TODO} onClick={onClick}>
              미루기
            </button>
          )}
          {category !== Categories.DOING && (
            <button name={Categories.DOING} onClick={onClick}>
              오늘하기
            </button>
          )}
          <button onClick={onClickDel}>지우기</button>
        </ToDoBtn>
      </li>
    </Wrapper>
  );
}

export default ToDo;
