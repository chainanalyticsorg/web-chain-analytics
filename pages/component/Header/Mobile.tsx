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
  chakra,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { publicConfig } from "../../../config/public";

function Header(props: FlexProps) {
  return (
    <Flex justifyContent="space-between" p="0 12px 0 15px" {...props}>
      <Flex align="center">
        <Image w="18px" h="18px" src="/images/logo.png" alt="" />
        <Text fontWeight="Bold" fontSize="12px" ml="8px" lineHeight="15px">
          ChainAnalytics
        </Text>
      </Flex>
      <Flex align="center">
        <chakra.a href={publicConfig.iotexMainnetUrl}>
          <Button
            fontSize="10px"
            h="24px"
            borderRadius="12px"
            mr="12px"
            variant="outline"
          >
            IoTeX Mainnet
          </Button>
        </chakra.a>
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
          <MenuList
            w="150px"
            minWidth={0}
            p={0}
            borderRadius={0}
            sx={{
              ".chakra-menu__menuitem:active": {
                background: "primary",
              },
            }}
          >
            <MenuItem h="32px">
              <chakra.a w="100%" href={publicConfig.statsUrl}>
                Stats
              </chakra.a>
            </MenuItem>
            <MenuItem h="32px">
              <chakra.a w="100%" href={publicConfig.docsUrl}>
                Docs
              </chakra.a>
            </MenuItem>
            <MenuItem h="32px">
              <chakra.a href={publicConfig.githubUrl}>GitHub</chakra.a>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default observer(Header);
