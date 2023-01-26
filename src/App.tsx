import { useRecoilState } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { isLightAtom } from "./atoms";
import TodoList from "./components/ToDoList";
import { darkTheme, lightTheme } from "./theme";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const GlobalStyle = createGlobalStyle`
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css");
   html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
    background-color: ${(props) => props.theme.bgColor};
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Toggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4em;
  height: 4em;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.theme.accentColor};
  }
`;

function App() {
  const [isLight, setIsLight] = useRecoilState(isLightAtom);
  const toggleAtom = () => setIsLight((prev) => !prev);

  return (
    <>
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Toggle onClick={toggleAtom}>
          {isLight ? <BsFillSunFill /> : <BsFillMoonFill />}
        </Toggle>
        <TodoList />
      </ThemeProvider>
    </>
  );
}

export default App;
