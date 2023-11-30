import { Heading, Spacer, Box } from "@chakra-ui/react";
import { getContents } from "../../api/ContentAPI/ContentAPI";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
import { DashboardTable } from "./Components";
import { DashboardTableContent } from "./types";

export function Dashboard() {
  const navigate = useNavigate();

  const [contents, setContents] = useState<Array<DashboardTableContent>>([]);

  useEffect(() => {
    getContents().then((contents) => {
      console.log(contents);
      setContents(contents);
    });
  }, []);
  return (
    <Box pl={20}>
      <Spacer style={{ marginTop: "20px" }} />
      <Heading>テンプレート一覧</Heading>
      <Spacer style={{ marginTop: "20px" }} />
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
        テンプレートを追加
      </Button>
      <Spacer style={{ marginTop: "20px" }} />
      <DashboardTable contents={contents} navigate={navigate} />
    </Box>
  );
}
