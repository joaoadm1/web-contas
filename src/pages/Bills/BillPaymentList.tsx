import {
    Button,
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
import { MyButton } from "../../components/MyButton/Mybutton";

interface BillType {
    _id: string;
    descricao: string;
    estaPaga: boolean;
    valor: number;
    dataVencimento: string;
    tipo: 'Despesa' | 'Receita';
}

export function BillPaymentList() {
    //useState => variável, função que altera a variável.
    const [billList, setBillList] = useState<BillType[]>([]);
    const [loading, setLoading] = useState(false);

    async function callRequest() {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/conta");
        setBillList(response.data);
        setLoading(false);
    }

    //é um hook do React de efeito colateral,
    //que será executado sempre antes do fim
    //do ciclo de renderização do componente.

    useEffect(() => {
        callRequest();
    }, []);

    useEffect(() => {
        console.log("alterou o valor da variável com sucesso!");
    }, [loading]
    );



    return (
        <>
            <MyButton buttonText="UPDATE BILLS" myColorScheme="blue" myOnClick={callRequest} />


            {loading && <h1>CARREGANDO</h1>}


            {!loading && (

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
            )}
        </>
    )
}