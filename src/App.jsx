import { useState } from "react";
import { ContextProvider } from "./context/Context";
import Layout from "./layouts/layout";

function App() {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
}

export default App;
