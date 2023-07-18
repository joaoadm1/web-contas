import { Button } from "@chakra-ui/react";

interface MyButtonProps {
    buttonText: string;
    myColorScheme?: string;
    myOnClick?: (text: string) => void
}

export function MyButton({ buttonText, myColorScheme, myOnClick}: MyButtonProps) {

    return (
        <>
            <Button colorScheme={myColorScheme} onClick={myOnClick}>
                {buttonText}
            </Button>
        </>

    );
}