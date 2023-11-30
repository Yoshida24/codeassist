import HTMLRichEditor from "../HTMLRichEditor/HTMLRichEditor";
import * as Mustache from "mustache";
import { Box } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { GeneratorContent } from "./types";

export function RightDrawer(props: {
  isOpen: boolean;
  onClose: () => void;
  contents: GeneratorContent;
}) {
  const { isOpen, onClose, contents } = props;
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">プロパティ</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Button
              colorScheme="teal"
              onClick={() =>
                window.open(
                  `https://headless-tagmanager.microcms.io/apis/templates`,
                  "_blank",
                )
              }
              w={"160px"}
              h={"32px"}
              fontSize={"12px"}
              variant="outline"
              leftIcon={<LuExternalLink />}
            >
              テンプレートを編集
            </Button>

            <Box>
              <FormLabel htmlFor="owner">Mustache テンプレート</FormLabel>
              <HTMLRichEditor
                key={new Date().getTime() + "1"}
                html={Mustache.default.render(contents.template, {
                  name: "Name",
                  age: 20,
                  sex: "男",
                })}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="desc">JSON Schema</FormLabel>
              <HTMLRichEditor
                key={new Date().getTime() + "4"}
                html={JSON.stringify(contents.schema, null, "  ")}
              />
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
