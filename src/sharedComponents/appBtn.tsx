import { CircularProgress, Button, styled } from "@mui/material";

const LoadingIndicator = styled("div")({
    color: "white"
});

const Text = styled("div")({
    fontWeight: "bold",
    color: "white",
});

export function AppBtn({
    isLoading = false,
    btnText,
    onPressed,
    ...props
}: AppBtnProp) {
    return (
        <>
        <Button
            {...props}
            type="submit"
            color="primary"
            onClick={onPressed}
            variant="contained"
            size="medium"
        >
            { isLoading ? (
                <CircularProgress
                    size={25}
                    thickness={5}
                    color="inherit"
                   
                />
                
            ) : (
                <Text>{btnText}</Text>
            )}
        </Button>
        </>
    )
    
}

interface AppBtnProp {
    isLoading?: boolean;
    btnText: string;
    onPressed: () => void;

}