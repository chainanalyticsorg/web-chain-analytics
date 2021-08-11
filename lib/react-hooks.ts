import { StyleProps } from "@chakra-ui/react"
import { useStore } from "../store"

export const usePlatform = () => {
    const { base } = useStore()
    return (mobileStyle: StyleProps, pcStyle: StyleProps): StyleProps =>  base.isMobile ? mobileStyle : pcStyle
}