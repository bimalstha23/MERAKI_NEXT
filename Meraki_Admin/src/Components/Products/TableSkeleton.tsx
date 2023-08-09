import { Skeleton, TableCell, TableRow } from "@mui/material"

export const TableSkeleton = () => {
    const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        Array.map((_item) => (
            <TableRow >
                <TableCell>
                    <Skeleton variant="rectangular" width={40} height={40} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </TableCell>
            </ TableRow>))
    )
}

