import { useEffect, useState } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import { useQuiz } from "../../../api/useQuiz"
import Loader from "../../../components/Loader"

export const Result = () => {
	const { result_id } = useParams()
	const { getResult } = useQuiz()
	const [ result, setResult ] = useState()

	useEffect(() => {
		getResult(result_id).then(data => setResult(data))
	}, []);

	return result
		?
			<Box>
				<Typography variant="h5">
					Your favorite type of music is <b>{result.title}</b>!
				</Typography>
				<Typography variant="h7" sx={{display: 'block', py: 3}}>
					{result.description}
				</Typography>
				<Box sx={{textAlign: 'center', py: 1, pb: 2}}>
					<Box 
						component="img" 
						sx={{
							maxHeight: '200px', 
							objectFit: 'cover', 
							maxHeight: '240px', 
							width: '60%', 
							borderRadius: '20px'
						}} 
						src={process.env.REACT_APP_API_ENDPOINT + result.media.path + "." + result.media.extention}
					/>
				</Box>
				<Button component={Link} to={'/'} sx={{my: 2, "&:hover": { color: "#fff" }}} variant="contained">
					Do more quizes
				</Button>
			</Box>
		: <Loader />
}