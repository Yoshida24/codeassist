import { Box, Button, Icon } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const SideMenu = () => {
  const navigate = useNavigate();
  const sideMenuItems = [
    {
      name: "テンプレート",
      icon: MdDashboard,
      onClick: () => navigate("/"),
    },
    {
      name: "microCMS",
      icon: LuExternalLink,
      onClick: () => window.open("https://app.microcms.io/", "_blank"),
    },
    {
      name: "GitHub",
      icon: BsGithub,
      onClick: () =>
        window.open("https://github.com/Yoshida24/codeassist", "_blank"),
    },
  ];
  return (
    <Box w="10pw" boxShadow="sm" bg="gray.100" pt={"64px"}>
      {sideMenuItems.map((item) => (
        <label>
          <Box mt="10px" ml="0px">
            <Button variant="ghost" fontSize={"sm"} onClick={item.onClick}>
              <Icon
                as={item.icon}
                w={8}
                h={8}
                p={1}
                mr="13px"
                border={"1px solid"}
                borderColor={"gray.400"}
                borderRadius={5}
              />
              {item.name}
            </Button>
          </Box>
        </label>
      ))}
    </Box>
  );
};
