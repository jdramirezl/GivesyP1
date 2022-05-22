import * as React from "react"
import {  SimpleGrid, SimpleGridProps } from "@chakra-ui/react"


export const Imagenes = (props: SimpleGridProps) => {
    return (
        <SimpleGrid
            columns={4}
            {...props}
        />
    )
}
