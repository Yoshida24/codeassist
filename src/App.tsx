import { SideMenu } from "./conponents/SideMenu/SideMenu";
import { LeftColumn } from "./conponents/SideMenu/LeftColmn";
import { DashboardPage } from "./routes/Dashboard";
import { GeneratorPage } from "./routes/Generator";
import { ChakraProvider, Box, Flex, theme } from "@chakra-ui/react";

// ルーティング設定に必要なものをimport
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Flex>
          <LeftColumn />
          <Box>
            <Flex>
              <BrowserRouter>
                <SideMenu />
                <Box w="85vw" minH={"100vh"} mt={"24px"}>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route
                      path="/templates/:templateId"
                      element={<GeneratorPage />}
                    />
                  </Routes>
                </Box>
              </BrowserRouter>
            </Flex>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;
