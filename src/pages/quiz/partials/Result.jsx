import { useContext, useEffect, useState } from "react"
import Page from "../../../components/Page"
import { QuizContext } from "../Quiz"
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useQuiz } from "../../../api/useQuiz";

export const Result = () => {
	const { result_id } = useParams();
	const { getResult } = useQuiz();
	const [ result, setResult ] = useState();

	useEffect(() => {
		console.log(result_id);
		getResult(result_id).then(data => {
			setResult(data);
		})
	}, []);
	// const quizContext = useContext(QuizContext);

	// useEffect(() => {
	// 	// console.log(quizContext);
	// },[quizContext])

	return <>
		{result && <Box>
			<Typography variant="h5">
				Your favorite type of music is {result.title}!
			</Typography>
			<Typography variant="h7" sx={{display: 'block', py: 3}}>
				{result.description}
			</Typography>
			<Button component={Link} to={'/'} sx={{"&:hover": { color: "#fff" }}} variant="contained">
				Do more quizes
			</Button>
		</Box>}
		
		
		{/* <Box sx={{textAlign: 'center', py: 1, pb: 2}}>
			<Box component="img" sx={{maxHeight: '200px', objectFit: 'cover', maxHeight: '240px', width: '60%', borderRadius: '20px'}} src="https://serious-science.org/img/2019/09/mohammad-metri-1oKxSKSOowE-unsplash-1.jpg" />
		</Box>
		{
			quizContext?.description && 
				<Typography variant="body1" sx={{maxWidth: '600px', display: 'block', margin: '0 auto', py: 2}}>
					{quizContext.description}
				</Typography>
		}
		<Stack spacing={1} direction="row" sx={{my: 2, justifyContent: 'center'}}>
			<Button component={Link} to="/" size="large" variant="outlined">Back to list</Button>
			<Button sx={{"&:hover": { color: "#fff" }}} component={Link} to="quiz"  size="large" variant="contained">Start Quiz</Button>
		</Stack> */}
	</>
}