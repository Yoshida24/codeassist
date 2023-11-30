import { createClient } from "microcms-js-sdk";
import { load } from "cheerio";

export function decodeHTMLSpecialWord(escapedHTMLString: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = escapedHTMLString;
  return textarea.value as string;
}

// eslint-disable-next-line
export async function getContent(props: { contentId: string }): Promise<any> {
  const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE,
    apiKey: import.meta.env.VITE_MICROCMS_KEY,
  });
  const res = await client.get({
    endpoint: "templates",
  });
  // eslint-disable-next-line
  const rawContents = res.contents as Array<any>;
  const content =
    rawContents
      .filter((content) => {
        return content.id === props.contentId;
      })
      .map((filteredContent) => {
        return {
          ...filteredContent,
          template:
            filteredContent.template !== undefined
              ? decodeHTMLSpecialWord(
                  load(filteredContent.template)("pre code").html() ?? "",
                )
              : null,
          schema:
            filteredContent.schema !== undefined
              ? JSON.parse(
                  decodeHTMLSpecialWord(
                    load(filteredContent.schema)("pre code").html() ?? "{}",
                  ),
                ) ?? {}
              : {},
        };
      })[0] ?? undefined;
  return content;
}

// eslint-disable-next-line
export async function getContents(): Promise<any> {
  const client = createClient({
    serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE,
    apiKey: import.meta.env.VITE_MICROCMS_KEY,
  });
  const res = await client.get({
    endpoint: "templates",
  });
  // eslint-disable-next-line
  const rawContents = res.contents as Array<any>;
  const contents = rawContents.map((rc) => {
    return {
      ...rc,
      template:
        rc.template !== undefined
          ? decodeHTMLSpecialWord(load(rc.template)("pre code").html() ?? "")
          : null,
      schema:
        rc.schema !== undefined
          ? JSON.parse(
              decodeHTMLSpecialWord(load(rc.schema)("pre code").html() ?? "{}"),
            ) ?? {}
          : {},
    };
  });
  return contents;
}
