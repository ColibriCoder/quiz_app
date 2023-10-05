import { useContext, useEffect } from "react"
import { QuizContext } from "../Quiz"
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";

export const Intro = () => {
	const quizContext = useContext(QuizContext);

	return quizContext 
		? 
			<>
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
						src={process.env.REACT_APP_API_ENDPOINT + quizContext.media.path + "." + quizContext.media.extention}
					/>
				</Box>
				{
					quizContext?.description && 
						<Typography variant="body1" sx={{maxWidth: '600px', display: 'block', margin: '0 auto', py: 2}}>
							{quizContext.description} There will be {quizContext.questions_count} questions in total.
						</Typography>
				}
				<Stack spacing={1} direction="row" sx={{my: 2, justifyContent: 'center'}}>
					<Button component={Link} to="/" size="large" variant="outlined">Back to list</Button>
					<Button sx={{"&:hover": { color: "#fff" }}} component={Link} to="quiz"  size="large" variant="contained">Start Quiz</Button>
				</Stack>
			</> 
		: <Loader />
}