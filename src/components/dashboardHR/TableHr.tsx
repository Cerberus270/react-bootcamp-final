import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { DocumentData, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getAllSicks, IApplicationData } from '../../utils/sdk';


const TableHr = ({data}: any) => {

  return (
    <TableContainer mt={'10'}>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Application ID</Th>
            <Th>Employee ID</Th>
            <Th>Medical Unit</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Doctor Name</Th>
            <Th>Medical Diagnostic</Th>
            <Th isNumeric>Coverage Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map((item: IApplicationData, i: any) => (
            <Tr key={i}>
              <Td>{item.id}</Td>
              <Td>{item.employeeId.id}</Td>
              <Td>{item.medicalUnit}</Td>
              <Td>{item.starDate.toDate().toLocaleDateString("en-us")}</Td>
              <Td>{item.endDate.toDate().toLocaleDateString("en-us")}</Td>
              <Td>{item.doctorName}</Td>
              <Td>{item.medicalDiagnostic}</Td>
              <Td>{item.coverageDays}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableHr