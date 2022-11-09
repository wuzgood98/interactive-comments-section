import { useState } from "react";

const useSetState = () => {
  const [text, setText] = useState("");
  return [text, setText];
};

export default useSetState;
