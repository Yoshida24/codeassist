import { Flex } from "@chakra-ui/react";

export const Header = () => (
  <Flex
    as="header"
    position="fixed"
    bg="white"
    top={0}
    width="full"
    height="64px"
    shadow="sm"
    py={4}
    px={8}
    alignContent="center"
    justifyContent={"space-around"}
  ></Flex>
);
