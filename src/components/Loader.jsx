import { Box, CircularProgress } from "@mui/material";

function Loader({minHeight}) {

	return <Box sx={{width: '100%', textAlign: 'center', py: 6}}><CircularProgress /></Box>
}

export default Loader;