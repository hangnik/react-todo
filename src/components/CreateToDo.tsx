import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { AiOutlinePlus } from "react-icons/ai";

const ToDoForm = styled.form`
  display: flex;
  margin: 40px 0;

  input {
    border: none;
    border-bottom: 1px solid #c4c0c0;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    width: 100%;
    font-size: 16px;
    margin-left: 8px;
    &:focus {
      outline: none;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    background-color: #ff5a60;
    height: 1.5rem;
    svg {
      color: #f5f5f5;
    }
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <ToDoForm onSubmit={handleSubmit(handleValid)}>
      <button>
        <AiOutlinePlus />
      </button>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="할 일을 추가해보세요"
      />
    </ToDoForm>
  );
}

export default CreateToDo;
