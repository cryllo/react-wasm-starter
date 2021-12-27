import React, { useEffect } from "react";

import useWasm from "../hooks/useWasm";

const App = () => {
  const { error, loading, initialize, wasmInstance } = useWasm();

  useEffect(() => {
    async function loadWasm() {
      await initialize();
    }
    loadWasm();
  }, []);

  if (error) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  if (loading) {
    return <p>Loading wasm.</p>;
  }

  if (wasmInstance) {
    wasmInstance.greet();
  }

  return <p>You have 1 new message in your console..</p>;
};

export default App;
