import { Stack, Skeleton } from '@chakra-ui/react'
import React from 'react'

const SkeletonTable = () => {
    return (
        <Stack mt={"10"}>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>
    )
}

export default SkeletonTable