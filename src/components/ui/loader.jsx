import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ component = false, text='Loading' }) => {
  if (component) {
    return (
      // loader to be used in specific components so it should be centered of that component
      <div
        className="flex w-full justify-center items-center my-32"
      >
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {text}
      </div>
    );
  }
  return (
    <div
      className={
        "flex absolute top-0 justify-center items-center bottom-0 left-0 right-0 z-50"
      }
    >
      <Loader2 className="mr-2 h-7 w-7 animate-spin" /> {text}
    </div>
  );
};

export default Loader;
