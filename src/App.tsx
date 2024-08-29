import Playground from "./components/Playground";
import PlaygroundProvider from "./context/Playground";

function App() {
  return (
    <PlaygroundProvider>
      <Playground />
    </PlaygroundProvider>
  );
}

export default App;
