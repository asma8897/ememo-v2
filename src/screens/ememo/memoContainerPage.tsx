import { Box } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { EmemoDetail } from "./ememoDetail/ememoDetail";
import MemoPage from "./MemoPage";

export function MemoContainerPage() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Routes>
        <Route path={`${pathname}`} element={<MemoPage />}></Route>
        {/* <Route path={`${pathname}/:ememoId`} element={<EmemoDetail />}></Route> */}
      </Routes>
    </Box>
  );
}
