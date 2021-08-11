import { Box, Button, Center, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import Header from "./component/Header";

const Label = ({ src, text, ...restProps }) => {
  return (
    <Flex
      p="0 16px"
      fontStyle="Medium"
      fontSize="16px"
      align="center"
      bg="rgba(232, 216, 253, 0.2)"
      color="primary"
      lineHeight="40px"
      borderRadius="20px"
      {...restProps}
    >
      <Image src={src} alt="" w="16px" h="16px" mr="12px" />
      {text}
    </Flex>
  );
};

const Statistics = ({ title, value, ...restProps }) => {
  return (
    <Box textAlign="center" {...restProps}>
      <Text color="primary" fontSize="36px" lineHeight="52px">
        {value}
      </Text>
      <Text mt="4px" fontWeight="bold" fontSize="16px" lineHeight="36px">
        {title}
      </Text>
    </Box>
  );
};

export default function Home() {
  return (
    <Flex justifyContent="center" bg="url(/images/home_bg.png)" minH="100vh">
      <Flex direction="column" align="center" w="100%" maxW="6xl">
        <Header w="100%" />
        <Flex mt="99px">
          <Label src="/images/home_analytics.png" text="Analytics Data" />
          <Label ml="25px" src="/images/home_rpc.png" text="RPC Service" />
          <Label ml="25px" src="/images/home_node.png" text="Node Operations" />
        </Flex>
        <Text
          textAlign="center"
          mt="45px"
          fontWeight="bold"
          fontSize="48px"
          lineHeight="59px"
        >
          Real-time Analytics for Blockchains
        </Text>
        <Text
          mt="24px"
          textAlign="center"
          wordBreak="break-all"
          maxW="633px"
          fontSize="16px"
          lineHeight="24px"
          color="#8989A2"
        >
          ChainAnalytics is an analytics protocol for blockchain networks like
          Ethereum, BSC, IoTeX. We committed to provide advanced analytics for
          explorers, Dapps, and research analysis.
        </Text>
        <Flex mt="36px">
          <Statistics title="GB Ready to serve" value="200" />
          <Statistics ml="79px" title="QuerIES served " value="200K" />
          <Statistics ml="87px" title="Dapps integrated" value="10" />
        </Flex>
        <Flex mt="60px">
          <Button borderRadius="23px">IoTeX Mainnet</Button>
          <Button
            borderRadius="23px"
            onClick={() => {}}
            ml="35px"
            variant="outline"
            bg="white"
            borderWidth={0}
          >
            <Link href="https://docs.chainanalytics.org/">Learn more</Link>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
