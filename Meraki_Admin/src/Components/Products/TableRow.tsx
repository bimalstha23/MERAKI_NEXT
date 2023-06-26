import { TableCell, TableRow } from '@mui/material'
import { FC, Fragment } from 'react'
import { MdModeEditOutline } from "react-icons/md"

export const TableRowComp: FC<{ row: any; innerRef?: (node: HTMLTableRowElement | null) => void }> = ({ row }) => {
    return (
        <TableRow key={row.id}>
            <TableCell align="center">
                <img src={row.images[0].url} alt="" />
            </TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center"> {row.name}</TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center">{row.description}</TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center">{row.category.name}</TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center">{row.quantity}</TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center">{row.selling_price}</TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center">{row.id}</TableCell>
            <TableCell sx={{
                fontWeight: '500',
                fontSize: '18px',
                color: '#121212'
            }} align="center">
                <button className=" text-textHighlight px-4 py-2 rounded-md">
                    <MdModeEditOutline />
                </button>
            </TableCell>
        </TableRow>

    )
}
