import { Box, Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import viteLogo from "../../assets/logo/icon_transparent.png";

export const LeftColumn = () => {
  return (
    <Flex bg="gray.800">
      <Box w="42px" m="5px">
        <Image src={viteLogo} w="40px" h="40px" />
        <label>
          <Box mt="10px" ml="10px"></Box>
        </label>
      </Box>
    </Flex>
  );
};
