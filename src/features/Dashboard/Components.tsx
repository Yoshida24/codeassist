import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { DashboardTableContent } from "./types";
import { NavigateFunction } from "react-router-dom";

export function DashboardTable(props: {
  contents: Array<DashboardTableContent>;
  navigate: NavigateFunction;
}) {
  return (
    <TableContainer m={"auto"} borderWidth={1} borderRadius={8}>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>テンプレート</Th>
            <Th>ディスクリプション</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.contents.map((content) => (
            <Tr key={content.id}>
              <Td>{content.title}</Td>
              <Td>{content.summary}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={() => props.navigate(`/templates/${content.id}`)}
                >
                  HTML作成
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
