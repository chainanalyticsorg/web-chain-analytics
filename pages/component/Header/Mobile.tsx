import {
  Image,
  Flex,
  Text,
  Link,
  Button,
  FlexProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { publicConfig } from "../../../config/public";

function Header(props: FlexProps) {
  return (
    <Flex justifyContent="space-between" p="0 12px 0 15px" {...props}>
      <Flex align="center">
        <Image w="18px" h="18px" src="/images/logo.png" alt="" />
        <Text fontStyle="Bold" fontSize="12px" ml="8px" lineHeight="15px">
          ChainAnalytics
        </Text>
      </Flex>
      <Flex align="center">
        <Button fontSize="10px" h="24px" borderRadius="12px" mr="12px" variant="outline">
        <Link href={publicConfig.iotexMainnetUrl}>IoTeX Mainnet</Link>
        </Button>

        <Menu>
          <MenuButton
            as={IconButton}
            minW={0}
            background="transparent !important"
            icon={
              <Image alt="" src="/images/mobile_menu.png" w="24px" h="24px" />
            }
            variant="ghost"
          />
          <MenuList w="150px" minWidth={0} p={0} borderRadius={0}>
            <MenuItem  h="32px">
              <Link  href={publicConfig.docsUrl}>Docs</Link>
            </MenuItem>
            <MenuItem h="32px">
              <Link href={publicConfig.githubUrl}>GitHub</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}


export default observer(Header)