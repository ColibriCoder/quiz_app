import { Container } from "@mui/material";


function Page({children}) {

	return (<div>
		<Container maxWidth="lg">
			{/* wrapper */}
			{children}
		</Container>
	</div>)
}

export default Page;