import { Image, Flex, Text, Link, Button, FlexProps, chakra } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { publicConfig } from "../../../config/public";
import { useStore } from "../../../store";
import MobileHeader from './Mobile'

 const Header = observer((props: FlexProps) => {
  const { base } = useStore()
  console.log('base.isMobile', base.isMobile)
  return base.isMobile ? <MobileHeader {...props}/> : (
     <Flex justifyContent="space-between" {...props}>
        <Flex align="center">
            <Image w="36px" h="36px" src="/images/logo.png" alt=""/>
            <Text fontWeight="Bold" fontSize="24px" ml="15px" lineHeight="29px">
                ChainAnalytics
            </Text>
        </Flex>
        <Flex align="center">
            <Link href={publicConfig.statsUrl}>Stats</Link>
            <Link ml="40px" href={publicConfig.docsUrl}>Docs</Link>
            <Link ml="40px" href={publicConfig.githubUrl}>GitHub</Link>
            <chakra.a href={publicConfig.iotexMainnetUrl}> <Button ml="40px" fontSize="14px" borderRadius="23px" variant="outline">IoTeX Mainnet</Button></chakra.a>
        </Flex>
     </Flex>
  )
})

export default Header
