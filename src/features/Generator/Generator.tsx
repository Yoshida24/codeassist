import HTMLRichEditor from "../HTMLRichEditor/HTMLRichEditor";
import SchemaBasedForm from "../SchemaBasedForm/SchemaBasedForm";
import { useState, useEffect } from "react";
import {
  getContent,
  decodeHTMLSpecialWord,
} from "../../api/ContentAPI/ContentAPI";
import * as Mustache from "mustache";
import {
  useDisclosure,
  Flex,
  Spacer,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  useToast,
  Button,
  Heading,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Sandbox } from "../Sandbox/Sandbox";
import { RightDrawer } from "./RightDrawerProperty";
import { GeneratorContent } from "./types";
import {
  LoadingOverlay,
  BreadClumb,
  Title,
  Description,
  ButtonProperty,
  ButtonTemplate,
  ButtonAIGenerateWithGenerating,
} from "./Components";
import { GenerateByOpenAI } from "../../api/GeneratePropsByOpenAI/GeneratePropsByOpenAI";

const EditSnippetTabPanelForm = (props: {
  // eslint-disable-next-line
  formData: any;
  // eslint-disable-next-line
  onFormChange: (e: any) => void;
  // eslint-disable-next-line
  schema: any;
}) => {
  const { formData, onFormChange, schema } = props;
  return (
    <Box w={"50%"}>
      <Spacer mt={"10px"} />
      <SchemaBasedForm
        formData={formData}
        onSubmit={() => null}
        onChange={onFormChange}
        schema={
          // eslint-disable-next-line
          schema as any
        }
      />
    </Box>
  );
};

export function Generator() {
  const [contents, setContents] = useState<GeneratorContent>({
    id: "",
    title: "",
    description: "",
    template: "",
    schema: {},
  });

  // eslint-disable-next-line
  const [formData, setFormData] = useState<any>({});
  const params = useParams<{ templateId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAIGenerateProceeding, setIsAIGenerateProceeding] = useState(false);
  const [userInputPrompt, setUserInputPrompt] = useState("");
  const toast = useToast();

  // eslint-disable-next-line
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    setUserInputPrompt(inputValue);
  };

  useEffect(() => {
    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す
    getContent({ contentId: params.templateId as string }).then((contents) => {
      console.log(contents);
      setContents(contents);
    });
  }, [params]);

  // eslint-disable-next-line
  const onFormChange = (e: any) => {
    setFormData(e.formData);
  };

  const generatePropsByAI = async () => {
    setIsAIGenerateProceeding(true);
    console.log(contents.schema);
    console.log(contents.template);
    try {
      const generatedFormData = await GenerateByOpenAI(
        userInputPrompt,
        JSON.stringify(contents.schema, null, 2),
        contents.template as string,
      );
      console.log(generatedFormData);
      setFormData(JSON.parse(generatedFormData?.json));
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          status: "warning",
          title: "不正なデータが生成されました",
          position: "top-right",
          description: `不正なデータが生成されたため更新を中断しました。再度生成を行うと成功することがあります。`,
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsAIGenerateProceeding(false);
    }
  };

  return (
    <Flex flexDirection="column" width="full" px={8} gap={5}>
      <BreadClumb />
      <Divider />
      <Title title={contents.title} />
      <Description description={contents.description} />
      <Spacer />
      <Flex flexDirection="row" width="full" gap={5}>
        <ButtonProperty onOpen={onOpen} />
        <ButtonTemplate />
      </Flex>
      <RightDrawer {...{ isOpen, onClose, contents }}></RightDrawer>
      <Spacer />
      <Tabs variant="enclosed" colorScheme={"teal"} w={"100%"}>
        <TabList>
          <Tab>スニペット作成</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDirection="row" width="full" gap={1}>
              <Box w={"50%"}>
                <Tabs colorScheme={"teal"}>
                  <TabList>
                    <Tab>プレビュー</Tab>
                    <Tab>コード</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      {/* <Heading size={"sm"} color={"gray.700"}>
                            プレビュー
                          </Heading> */}
                      <Spacer mt={"10px"} />
                      <Box
                        borderWidth={"1px"}
                        borderRadius={"8px"}
                        borderColor={"gray.100"}
                      >
                        <Sandbox
                          {...{
                            htmlScaffold: "<p>aaa</p>",
                            snippet: decodeHTMLSpecialWord(
                              Mustache.default.render(
                                contents.template,
                                formData,
                              ),
                            ),
                          }}
                        />
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <HTMLRichEditor
                        html={decodeHTMLSpecialWord(
                          Mustache.default.render(contents.template, formData),
                        )}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box w={"50%"} pl={"64px"}>
                <Flex flexDirection="row" width="full" gap={1}>
                  <Box mr={"70px"}>
                    <Heading size={"sm"} color={"teal"} lineHeight={"32px"}>
                      パラメータ
                    </Heading>
                  </Box>
                  <Box>
                    <Popover closeOnBlur={true} placement={"top"}>
                      <PopoverTrigger>
                        <Button
                          colorScheme="teal"
                          w={"200px"}
                          h={"32px"}
                          fontSize={"12px"}
                          variant="outline"
                          isLoading={isAIGenerateProceeding}
                          loadingText={"生成中..."}
                          leftIcon={<FaWandMagicSparkles />}
                        >
                          パラメータをAIで生成
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent w={"400px"}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontSize={"sm"}>
                          生成プロンプト
                        </PopoverHeader>
                        <PopoverBody>
                          <Textarea
                            value={userInputPrompt}
                            onChange={handleInputChange}
                            placeholder={`例:入力の成功を表すダイアログを生成してください。`}
                            fontSize={"sm"}
                          />
                          <Spacer mt={"10px"} />
                          <Box textAlign={"center"}>
                            <ButtonAIGenerateWithGenerating
                              {...{
                                onClick: generatePropsByAI,
                                isGenerating: isAIGenerateProceeding,
                                label: "実行",
                              }}
                            />
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>
                {isAIGenerateProceeding ? (
                  <LoadingOverlay />
                ) : (
                  <EditSnippetTabPanelForm
                    {...{ onFormChange, formData, schema: contents.schema }}
                  />
                )}
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
