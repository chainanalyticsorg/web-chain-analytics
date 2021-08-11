import {
  Box,
  Button,
  Center,
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

const Label = ({ src, text, ...restProps }) => {
  const setPlatformStyle = usePlatform();
  return (
    <Flex
      align="center"
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
  const { base } = useStore();
  const setPlatformStyle = usePlatform();
  useEffect(() => {
    const browser = helper.browser();
    base.setPlatform(browser.getPlatformType());
  }, []);
  return (
    <>
      <Flex
        justifyContent="center"
        bg="url(/images/home_bg.png)"
        minH="100vh"
        overflowX="hidden"
      >
        <Flex
          direction="column"
          align="center"
          w="100%"
          maxW="6xl"
          overflowX="hidden"
          {...setPlatformStyle(
            {
              bg: "url(/images/home_mobile_bg.png)",
            },
            {
              bg: "url(/images/home_pc_bg.png)",
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
            <Label src="/images/home_analytics.png" text="Analytics Data" />
            <Label
              {...setPlatformStyle(
                {},
                {
                  ml: "25px",
                }
              )}
              src="/images/home_rpc.png"
              text="RPC Service"
            />
            <Label
              {...setPlatformStyle(
                {},
                {
                  ml: "25px",
                }
              )}
              src="/images/home_node.png"
              text="Node Operations"
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
            Real-time Analytics for Blockchains
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
                maxW: "633px",
              }
            )}
          >
            ChainAnalytics is an analytics protocol for blockchain networks like
            Ethereum, BSC, IoTeX. We committed to provide advanced analytics for
            explorers, Dapps, and research analysis.
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
            <Statistics title="GB Ready to serve" value="200" />
            <Statistics
              title="QuerIES served "
              value="200K"
              {...setPlatformStyle(
                {
                  mt: "32px",
                },
                { ml: "79px" }
              )}
            />
            <Statistics
              title="Dapps integrated"
              value="10"
              {...setPlatformStyle(
                {
                  mt: "32px",
                },
                { ml: "87px" }
              )}
            />
          </Flex>
          <Flex  {
            ...setPlatformStyle({
              flexDirection: "column",
              marginTop:"33px",
              alignItems: "center",
              justifyContent: 'center',
              w: "100%",
              p: "0 12px"
            }, {
              mt:"60px"
            })
          }>
            <Button {...setPlatformStyle({
              w: "100%",
              fontSize: "17px",
              h: "44px",
              borderRadius: "20px",
            }, {
              h: "46px",
              borderRadius:"23px" 
            })}><Link href={publicConfig.iotexMainnetUrl}>IoTeX Mainnet</Link></Button>
            <Button
              onClick={() => {}}
              variant="outline"
              bg="white"
              borderWidth={0}
              {...setPlatformStyle({
                w: "100%",
                mt: "21px",
                fontSize: "17px",
                h: "44px",
                borderRadius: "20px",
              }, {
                ml:"35px",
                h: "46px",
                borderRadius:"23px"
              })}
            >
              <Link href={publicConfig.docsUrl}>Learn more</Link>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default observer(Home);
