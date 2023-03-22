import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import { DocumentData, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { getAllSicks } from '../../utils/sdk';

interface IApplicationData {
  employeeId: DocumentData;
  medicalUnit: string;
  starDate: Timestamp;
  endDate: Timestamp;
  doctorName: string;
  medicalDiagnostic: string;
  coverageDays: string;
  id: string;
}

const TableHr = () => {
  const [sickApplications, setSickApplication] = useState<IApplicationData[]>([]);
  useEffect(() => {
    const getData = async () => {
      let sickAplicationsT: any[] = await getAllSicks();
      if (sickAplicationsT.length > 0) {
        setSickApplication(sickAplicationsT);
      }
    }

    getData();
  }, [])

  return (
    <TableContainer>
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
          { sickApplications.map((item, i) => (
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