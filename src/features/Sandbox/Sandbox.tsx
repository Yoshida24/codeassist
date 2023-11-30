import { Box } from "@chakra-ui/react";

export function Sandbox(props: { htmlScaffold: string; snippet: string }) {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>playground</title>
      </head>
      <body>
      ${props.snippet}
      </body>
    </html>
  `.trim();

  return (
    <Box>
      <iframe
        height="450px"
        sandbox="allow-downloads allow-downloads-without-user-activation allow-forms allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation allow-top-navigation-by-user-activation allow-top-navigation-to-custom-protocols"
        width="100%"
        srcDoc={html}
      ></iframe>
    </Box>
  );
}
