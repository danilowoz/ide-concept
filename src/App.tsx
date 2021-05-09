import CodeEditor from "./CodeEditor";
import { Editor, Bar, LineCounter } from "./AppUI";
import { useNavRef } from "./utils/hooks/navRef";
import * as actions from "./actions";

export default function App() {
  const { setRef, onJumpArea } = useNavRef();

  return (
    <Editor>
      <Bar />
      <LineCounter>
        {new Array(200).fill(" ").map((_, i) => (
          <span>{i + 1}</span>
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
        barColor="#304942"
        data={`  const [state, setState] = useState()
`}
      />

      <CodeEditor
        type="effect"
        onJumpArea={onJumpArea(2)}
        ref={(ref) => setRef({ index: 2, ref })}
        menuActions={actions.effects}
        barColor="#303C49"
        data={`  useEffect(() => {
    // doSomething()
  }, [])
  `}
      />
      <CodeEditor type="empty" data={""} />
    </Editor>
  );
}
