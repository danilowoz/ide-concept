import CodeEditor from "./CodeEditor";
import { Editor, Bar, LineCounter } from "./AppUI";
import { useNavRef } from "./hooks/navRef";

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
        ref={(ref) => setRef({ index: 0, ref })}
        data={`function App() {`}
        onJumpArea={onJumpArea(0)}
      />
      <CodeEditor
        ref={(ref) => setRef({ index: 1, ref })}
        onJumpArea={onJumpArea(1)}
        barColor="#304942"
        data={`  const [state, setState] = useState()
`}
      />

      <CodeEditor
        onJumpArea={onJumpArea(2)}
        ref={(ref) => setRef({ index: 2, ref })}
        barColor="#303C49"
        data={`  useEffect(() => {

  }, [])
  `}
      />
      <CodeEditor data={""} />
    </Editor>
  );
}
