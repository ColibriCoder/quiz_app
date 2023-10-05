import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material"
import Page from "../components/Page"
import { Link } from "react-router-dom"
import { useQuiz } from "../api/useQuiz"
import { useEffect, useState } from "react"

export const QuizList = () => {
	const { getQuizList } = useQuiz()
	const [ quizList, setQuizList ] = useState()

	useEffect(() => {
		getQuizList().then(data => {
			setQuizList(data);
		})
	}, [])

	return <Page>	
		<Box sx={{py: 2, pb: 3, textAlign: 'center'}}>
			<Typography variant="h4" sx={{py: 4, pb: 1}}>Quizzes</Typography>
		</Box>
		<Stack spacing={2}>	
			{
				quizList?.map((quizz, key) =>
					<Card key={key}>
						<Grid container>
							<Grid item xs={12} sm={4} md={2}>
								<CardMedia
									component="img"
									sx={{ height: '100%' }}
									image={process.env.REACT_APP_API_ENDPOINT + quizz.media.path + "." + quizz.media.extention}
									alt="Live from space album cover"
								/>
							</Grid>
							<Grid item xs={12} sm={8} md={10} sx={{position: 'relative'}}>
								<CardContent >
									<Typography gutterBottom variant="h5" component="div">
										{quizz?.title || '-'}
									</Typography>
									<Typography  variant="body2" color="text.secondary">
										{quizz?.description || '-'}
									</Typography>

									<Typography variant="body1" sx={{pt: 1}} >
										<Link to={'quiz/' + quizz.external_key} >
											Take a quiz
										</Link>
									</Typography>
								</CardContent>
							</Grid>
						</Grid>
					</Card>
				) || "loading"}
		</Stack>
    </Page>
}