import CodeEditor from "./CodeEditor";
import { Editor, Bar, LineCounter, Body, Filename, KeyBindings } from "./AppUI";
import { useNavRef } from "./utils/navRef";
import * as actions from "./actions";
import { GlobalStyle } from "./utils/globalStyle";
import { SorterComponent } from "./SorterComponent";
import { Render } from "./Render";
import { useState } from "react";

export default function App() {
  const { setRef, onJumpArea } = useNavRef();
  const [renderCode, setRenderCode] = useState([
    `      <h1>{state}</h1>`,
    `      <p>Lorem ipsum</p>`,
    `      <input onChange={({target}) => setState(target.value)} />`
  ]);

  const handleTemplateRenderChange = (template: string, index: number) => {
    setRenderCode((prev) =>
      prev.map((code, prevIndex) => {
        if (prevIndex === index) {
          return `      ${template.replace("{{template}}", code.trim())}`;
        }

        return code;
      })
    );
  };

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
            data={`  const [state, setState] = useState("Hello world")
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
    document.title = state
  }, [state])
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
            <SorterComponent
              onSort={setRenderCode}
              onChangeTemplate={handleTemplateRenderChange}
              renderCode={renderCode}
            />

            <CodeEditor
              onSelectItem={(template: any) =>
                setRenderCode((prev) => [...prev, template])
              }
              type="render"
              noTriggerOnSelect
              barColor="#552525"
              menuActions={actions.render}
              data={`    </> 
  )`}
            />
          </Render>

          <CodeEditor type="empty" data={`}`} />
        </Editor>

        <p>Key bindings:</p>
        <KeyBindings>
          <li>
            <span>ctrl + s</span>: for states area
          </li>
          <li>
            <span>ctrl + e</span>: for effects area
          </li>
          <li>
            <span>ctrl + r</span>: for render area
          </li>
          <li>
            <span>command + mouseover</span>: to see the options in a component
          </li>
        </KeyBindings>
      </Body>
    </>
  );
}
