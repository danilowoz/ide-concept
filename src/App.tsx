import CodeEditor from "./CodeEditor";
import { Editor, Bar, LineCounter, Body, Filename } from "./AppUI";
import { useNavRef } from "./utils/navRef";
import * as actions from "./actions";
import { GlobalStyle } from "./utils/globalStyle";
import { SorterComponent } from "./SorterComponent";
import { Render } from "./utils/Render";
import styled from "styled-components";

const SorterBar = styled(Bar)`
  user-select: none;
  background-color: #552525;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0;
`;

export default function App() {
  const { setRef, onJumpArea } = useNavRef();

  return (
    <>
      <GlobalStyle />

      <Body>
        <Editor>
          <Filename>App.jsx</Filename>
          <Bar />
          <LineCounter>
            {new Array(200).fill(" ").map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </LineCounter>

          <CodeEditor
            type="empty"
            ref={(ref) => setRef({ index: 0, ref })}
            data={`function App() {`}
            onJumpArea={onJumpArea(0)}
          />
          <CodeEditor
            type="state"
            ref={(ref) => setRef({ index: 1, ref })}
            onJumpArea={onJumpArea(1)}
            menuActions={actions.states}
            barColor="#2E5E51"
            data={`  const [state, setState] = useState()
`}
          />
          <CodeEditor type="empty" data={""} />
          <CodeEditor
            type="effect"
            onJumpArea={onJumpArea(2)}
            ref={(ref) => setRef({ index: 2, ref })}
            menuActions={actions.effects}
            barColor="#254262"
            data={`  useEffect(() => {
    // doSomething()
  }, [])
  `}
          />

          <CodeEditor type="empty" data={""} />

          <Render>
            <CodeEditor
              type="empty"
              barColor="#552525"
              data={`  return (
    <>`}
            />
            <SorterComponent>
              <>
                <CodeEditor type="render" data={`      <h1>Hello World</h1>`} />
                <SorterBar />
              </>
              <>
                <CodeEditor type="render" data={`      <p>Lorem ipsum</p>`} />
                <SorterBar />
              </>
            </SorterComponent>

            <CodeEditor type="render" barColor="#552525" data={`    </> `} />
          </Render>

          <CodeEditor
            type="empty"
            data={`
}`}
          />
        </Editor>
      </Body>
    </>
  );
}
