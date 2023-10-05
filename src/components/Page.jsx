import { Container } from "@mui/material"

function Page({children}) {
	return <Container maxWidth="lg">
			{children}
		</Container>
}

export default Page