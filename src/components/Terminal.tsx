import { Terminal as XtermTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

const Terminal = () => {
  const xtermRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef<boolean>(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const xterm = new XtermTerminal({
      rows: 15,
      theme: {
        background: "#000000",
        foreground: "#fff",
      },
      fontFamily: "monospace",
      fontSize: 18,
    });

    xterm.open(xtermRef.current!);

    xterm.write(" > ");


    xterm.onData((d) => {
        console.log(d)
    })

    xterm.onKey((e) => {
      xterm.write(e.key);
      if (e.key == "\r") {
        xterm.write("\n");
        xterm.write(" > ");
      }
    });
  }, []);

  return <div className="max-h-fit border-t border-red-500" ref={xtermRef} />;
};

export default Terminal;
