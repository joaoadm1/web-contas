import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface BillType{
    _id: string;
    descricao: string;
    estaPaga: boolean;
    valor: number;
    dataVencimento: string;
    tipo: 'Despesa' | 'Receita';
}

export function BillPaymentList() {
    const [billList, setBillList] = useState<BillType[]>([]);

    async function callRequest() {
        const response = await axios.get("http://localhost:3000/conta");
        setBillList(response.data);
    }

    useEffect(() => {
        callRequest();
    }, []);

    return (
        <TableContainer>
            <Table variant={"simple"}>
                <TableCaption> Registered Payment Bill List </TableCaption>
                <Thead>
                    <Tr>
                        <Th>DESCRIPTION</Th>
                        <Th isNumeric>VALUE</Th>
                        <Th>TYPE</Th>
                        <Th>PAID</Th>
                        <Th>PAY DAY</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        billList.map((bill) => (
                            <Tr>
                                <Td>{bill.descricao}</Td>
                                <Td>{bill.valor}</Td>
                                <Td>{bill.tipo}</Td>
                                <Td>{bill.estaPaga ? 'Sim' : 'Não'}</Td>
                                <Td>{bill.dataVencimento}</Td>
                            </Tr>
                        ))}
                </Tbody>

            </Table>
        </TableContainer>
    )
}