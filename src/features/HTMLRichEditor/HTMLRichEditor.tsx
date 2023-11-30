import "./style.css";
import Highlight from "react-highlight";
import { Box } from "@chakra-ui/react";

export function HTMLRichEditor(props: { html: string }) {
  return (
    <Box fontSize={"xs"}>
      <Highlight className={"html"}>{props.html}</Highlight>
    </Box>
  );
}

export default HTMLRichEditor;
