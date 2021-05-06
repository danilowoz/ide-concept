import CodeEditor from "./CodeEditor";
import { Editor, Bar, LineCounter } from "./AppUI";

export default function App() {
  return (
    <Editor>
      <Bar />
      <LineCounter>
        {new Array(200).fill(" ").map((_, i) => (
          <span>{i + 1}</span>
        ))}
      </LineCounter>

      <CodeEditor data={`function App() {`} />
      <CodeEditor
        barColor="#304942"
        data={`  const [state, setState] = useState()
`}
      />

      <CodeEditor
        barColor="#303C49"
        data={`  useEffect(() => {

  }, [])
  `}
      />
      <CodeEditor data={""} />
    </Editor>
  );
}
