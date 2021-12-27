import { useCallback, useState } from "react";

type WasmInstance = typeof import("../../../wasm/pkg/index.js");

const useWasm = () => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [wasmInstance, setWasmInstance] = useState<WasmInstance | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const initialize = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      const wasm = await import("../../../wasm/pkg/index.js");
      setWasmInstance(wasm);
    } catch (error) {
      // @ts-ignore
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    initialize,
    wasmInstance,
  };
};

export default useWasm;
