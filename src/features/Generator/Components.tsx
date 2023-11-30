import { MdBuild } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Button, Heading, Box, Spinner } from "@chakra-ui/react";

export function LoadingOverlay() {
  return (
    <Box>
      <Spinner size={"lg"} color={"teal.500"}></Spinner>
    </Box>
  );
}

export function BreadClumb() {
  return (
    <Box>
      <Heading size={"sm"} color={"gray.500"}>
        {"テンプレート一覧 > HTML作成"}
      </Heading>
    </Box>
  );
}

export function Title(props: { title: string }) {
  return (
    <Box>
      <Heading size={"lg"} color={"teal.500"}>
        {props.title}
      </Heading>
    </Box>
  );
}

export function Description(props: { description: string }) {
  return (
    <Box fontSize={"sm"}>
      <div dangerouslySetInnerHTML={{ __html: props.description }} />
    </Box>
  );
}

export function ButtonProperty(props: { onOpen: () => void }) {
  return (
    <Box>
      <Button
        colorScheme="teal"
        onClick={props.onOpen}
        w={"100px"}
        h={"32px"}
        fontSize={"12px"}
        variant="outline"
        leftIcon={<MdBuild />}
      >
        プロパティ
      </Button>
    </Box>
  );
}

export function ButtonTemplate() {
  return (
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
  );
}

export function ButtonAIGenerateWithGenerating(props: {
  onClick?: () => void;
  label: string;
  isGenerating: boolean;
}) {
  return (
    <Button
      colorScheme="teal"
      onClick={props.onClick}
      w={"100px"}
      h={"32px"}
      fontSize={"12px"}
      variant="outline"
      isLoading={props.isGenerating}
      loadingText={"生成中..."}
      leftIcon={<FaWandMagicSparkles />}
    >
      {props.label}
    </Button>
  );
}
