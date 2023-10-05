import { createContext, useEffect, useState } from "react";
import Page from "../../components/Page"
import { Link, Outlet, useParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuiz } from "../../api/useQuiz";

export const QuizContext = createContext();

export const Quiz = () => {
	const { external_key } = useParams();
	const { getQuiz } = useQuiz();
	const [ quiz, setQuiz ] = useState();

	useEffect(() => {
		getQuiz(external_key).then(data => {
			setQuiz(data);
			console.log(data);
		})
		// console.log(external_key);
		// getQuizList().then(data => {
		// 	setQuizList(data);
		// })
	}, [])


	return <Page>	
		<Box sx={{textAlign: 'center', pt: 10}}>

{/* 		
		<Box sx={{py: 2, pb: 3, textAlign: 'center'}}>
			<Typography variant="h4" sx={{py: 4, pb: 1}}>Quizz{quiz?.title && (': ' + quiz.title)}</Typography>
		</Box> */}
		
		{/* <Box sx={{py: 2, pb: 3, textAlign: 'center'}}>
			<Typography variant="h4" sx={{py: 4, pb: 5}}>Quizzes</Typography>
		</Box> */}
			<QuizContext.Provider value={quiz}>
				<Outlet />
			</QuizContext.Provider>
		</Box>
    </Page>
}