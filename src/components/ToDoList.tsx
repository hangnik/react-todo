import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  letter-spacing: -0.05em;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    font-size: 55px;
    font-weight: 500;
  }
  span:last-child {
    font-size: 25px;
  }
`;

const Wrapper = styled.div`
  margin: 40px 0;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  border-radius: 15px;
  border: none;
  padding: 10px;
  font-size: 18px;
  line-height: 24px;
  &:hover {
    box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
  }
  &:focus {
    outline: none;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const date = new Date();
  const week_array = new Array(
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  );
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = date.getDay();
  return (
    <Container>
      <Helmet>
        <title>To Do</title>
      </Helmet>
      <Header>
        <Title>
          <span>Daily</span>
          <span>ToDo</span>
        </Title>
        <Time>
          <span>{`${hours}:${minutes}`}</span>
          <span>{`${month}월${day}일 ${week_array[week]}`}</span>
        </Time>
      </Header>
      <Wrapper>
        <Select value={category} onInput={onInput}>
          <option value={Categories.DOING}>오늘 할 일</option>
          <option value={Categories.TODO}>나중에 할 일</option>
          <option value={Categories.DONE}>완료됨</option>
        </Select>
        <CreateToDo />
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Wrapper>
    </Container>
  );
}

export default ToDoList;
