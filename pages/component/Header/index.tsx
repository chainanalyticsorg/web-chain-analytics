import { Image, Flex, Text, Link, Button } from "@chakra-ui/react";
import React from "react";
import Bowser from "bowser";

export default function Header(props) {
  return (
     <Flex justifyContent="space-between" mt="38px" {...props}>
        <Flex align="center">
            <Image w="36px" h="36px" src="/images/logo.png" alt=""/>
            <Text fontStyle="Bold" fontSize="24px" lineHeight="29px">
                ChainAnalytics
            </Text>
        </Flex>
        <Flex align="center">
            <Link href="https://docs.chainanalytics.org/">Docs</Link>
            <Link ml="40px" href="https://github.com/chainanalyticsorg">GitHub</Link>
            <Button ml="40px" borderRadius="23px" variant="outline">IoTeX Mainnet</Button>
        </Flex>
     </Flex>
  )
}
