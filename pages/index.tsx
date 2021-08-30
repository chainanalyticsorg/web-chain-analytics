import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Image,
  Link,
  StyleProps,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "./component/Header";
import { helper } from "../lib/helper";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import { usePlatform } from "../lib/react-hooks";
import { publicConfig } from "../config/public";
import { Helmet } from "react-helmet";

const Label = ({ src, text, ...restProps }) => {
  const setPlatformStyle = usePlatform();
  return (
    <Flex
      align="center"
      fontWeight={500}
      bg="rgba(232, 216, 253, 0.2)"
      color="primary"
      borderRadius="20px"
      flexWrap="nowrap"
      {...setPlatformStyle(
        {
          width: "110px",
          justifyContent: "center",
          fontSize: "10px",
          lineHeight: "22px",
        },
        {
          p: "0 16px",
          fontSize: "16px",
          lineHeight: "40px",
        }
      )}
      {...restProps}
    >
      <Image
        src={src}
        alt=""
        w="16px"
        h="16px"
        {...setPlatformStyle(
          {
            mr: "4px",
          },
          {
            mr: "12px",
          }
        )}
      />
      <Text whiteSpace="nowrap">{text}</Text>
    </Flex>
  );
};

interface StatisticsPorps extends StyleProps {
  title: string;
  value: string;
}

const Statistics = ({ title, value, ...restProps }: StatisticsPorps) => {
  const setPlatformStyle = usePlatform();
  return (
    <Box textAlign="center" {...restProps}>
      <Text
        color="primary"
        {...setPlatformStyle(
          {
            fontSize: "24px",
            lineHeight: "26px",
          },
          {
            fontSize: "36px",
            lineHeight: "52px",
          }
        )}
      >
        {value}
      </Text>
      <Text
        fontWeight="bold"
        {...setPlatformStyle(
          {
            fontSize: "12px",
            lineHeight: "18px",
            mt: "2px",
          },
          {
            fontSize: "16px",
            lineHeight: "36px",
            mt: "4px",
          }
        )}
      >
        {title}
      </Text>
    </Box>
  );
};

function Home() {
  const { base, lang } = useStore();
  const setPlatformStyle = usePlatform();
  useEffect(() => {
    const browser = helper.browser();
    base.setPlatform(browser.getPlatformType());
  }, []);
  return (
    <>
      <Helmet>
        <meta name="keywords" content="ChainAnalytics, Ethereum Analytics, IoTeX Analytics" />
        <title>
          ChainAnalytics: analytics protocol for blockchain networks.
        </title>
      </Helmet>
      <Flex
        justifyContent="center"
        bg="url(/images/home_bg.png) no-repeat"
        minH="100vh"
        backgroundSize="100% 100%"
        overflowX="hidden"
      >
        <Flex
          direction="column"
          align="center"
          w="100%"
          maxW="6xl"
          overflowX="hidden"
          backgroundSize="100% 100%"
          {...setPlatformStyle(
            {
              bg: "url(/images/home_mobile_bg.png) no-repeat",
            },
            {
              bg: "url(/images/home_pc_bg.png) no-repeat",
            }
          )}
        >
          <Header
            w="100%"
            {...setPlatformStyle(
              {
                mt: "8px",
              },
              {
                mt: "38px",
              }
            )}
          />
          <Flex
            {...setPlatformStyle(
              {
                mt: "47px",
                w: "100%",
                p: "0 17px 0 12px",
                justifyContent: "space-between",
              },
              {
                mt: "99px",
              }
            )}
          >
            <Label
              src="/images/home_analytics.png"
              text={lang.t(`home.analytics_data`)}
            />
            <Label
              {...setPlatformStyle(
                {},
                {
                  ml: "25px",
                }
              )}
              src="/images/home_rpc.png"
              text={lang.t(`home.rpcService`)}
            />
            <Label
              {...setPlatformStyle(
                {},
                {
                  ml: "25px",
                }
              )}
              src="/images/home_node.png"
              text={lang.t(`home.node_operations`)}
            />
          </Flex>
          <Text
            textAlign="center"
            {...setPlatformStyle(
              {
                mt: "47px",
                fontSize: "30px",
                lineHeight: "37px",
                p: "0 12px",
              },
              {
                mt: "45px",
                fontSize: "48px",
                lineHeight: "59px",
              }
            )}
            fontWeight="bold"
          >
            {lang.t(`home.subject`)}
          </Text>
          <Text
            textAlign="center"
            wordBreak="break-all"
            color="#8989A2"
            {...setPlatformStyle(
              {
                mt: "8px",
                fontSize: "12px",
                lineHeight: "16px",
                w: "100%",
                p: "0 12px",
              },
              {
                mt: "24px",
                fontSize: "16px",
                lineHeight: "24px",
                maxW: "800px",
              }
            )}
          >
            {lang.t(`home.desc`)}
          </Text>
          <Flex
            maxW="100%"
            {...setPlatformStyle(
              {
                flexDirection: "column",
                mt: "33px",
              },
              { mt: "36px" }
            )}
          >
            <Statistics title={lang.t(`home.gb_to_serve`)} value="500+" />
            <Statistics
              title={lang.t(`home.queries_served`)}
              value="200K"
              {...setPlatformStyle(
                {
                  mt: "32px",
                },
                { ml: "79px" }
              )}
            />
            <Statistics
              title={lang.t(`home.dapps_intergated`)}
              value="10+"
              {...setPlatformStyle(
                {
                  mt: "32px",
                },
                { ml: "87px" }
              )}
            />
          </Flex>
          <Flex
            {...setPlatformStyle(
              {
                flexDirection: "column",
                marginTop: "33px",
                alignItems: "center",
                justifyContent: "center",
                w: "100%",
                p: "0 12px",
              },
              {
                mt: "60px",
              }
            )}
          >
            <chakra.a
              href={publicConfig.iotexMainnetUrl}
              {...setPlatformStyle({ w: "100%" }, {})}
            >
              <Button
                {...setPlatformStyle(
                  {
                    w: "100%",
                    fontSize: "17px",
                    h: "44px",
                    borderRadius: "20px",
                  },
                  {
                    h: "46px",
                    borderRadius: "23px",
                  }
                )}
              >
                IoTeX Mainnet
              </Button>
            </chakra.a>
            <chakra.a
              href={publicConfig.docsUrl}
              {...setPlatformStyle(
                {
                  mt: "21px",
                  w: "100%",
                },
                {
                  ml: "35px",
                }
              )}
            >
              <Button
                variant="outline"
                bg="white"
                borderWidth={0}
                {...setPlatformStyle(
                  {
                    w: "100%",

                    fontSize: "17px",
                    h: "44px",
                    borderRadius: "20px",
                  },
                  {
                    h: "46px",
                    borderRadius: "23px",
                  }
                )}
              >
                {lang.t(`home.learn_more`)}
              </Button>
            </chakra.a>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default observer(Home);
