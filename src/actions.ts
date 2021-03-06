export const states = [
  {
    title: "useState",
    documentation: "https://reactjs.org/docs/hooks-state.html",
    template: "const [state, setState] = useState()"
  },
  {
    title: "useReducer",
    documentation: "https://reactjs.org/docs/hooks-reference.html#usereducer",
    template: `
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }
  
  const [state, dispatch] = useReducer(reducer,
    { count: 0 }
  );`
  },
  {
    title: "useContext",
    documentation: "https://reactjs.org/docs/hooks-reference.html#usecontext",
    template: "const value = useContext(MyContext);"
  },
  {
    title: "useRef",
    documentation: "https://reactjs.org/docs/hooks-reference.html#useref",
    template: "const refContainer = useRef();"
  }
];

export const effects = [
  {
    title: "useEffect",
    documentation: "https://reactjs.org/docs/hooks-reference.html#useeffect",
    template: `useEffect(()=> {
    // doSomething(a, b);
  }, [])`
  },
  {
    title: "useCallback",
    documentation: "https://reactjs.org/docs/hooks-reference.html#usecallback",
    template: `const memoizedCallback = useCallback( () => {
    // doSomething();
  }, []);`
  },
  {
    title: "useLayoutEffect",
    documentation:
      "https://reactjs.org/docs/hooks-reference.html#uselayouteffect",
    template: `useLayoutEffect(()=> {

  }, [])`
  }
];

export const render = [
  {
    title: `<Header /> - "./Header"`,
    template: `      <Header />`
  },
  {
    title: `<Box /> - "./Box"`,
    template: `      <Box />`
  }
];

export const renderItem = [
  {
    title: "Add conditional",
    template: `{someBoolean && {{template}}}`
  },
  {
    title: "Add ternary operator",
    template: `{someBoolean ? {{template}} : null}`
  },
  {
    title: ".map it",
    template: `{[].map(item => {{template}})}`,
    documentation:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
  }
];
