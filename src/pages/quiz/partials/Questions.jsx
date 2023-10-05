// import { useContext, useEffect } from "react"
// import Page from "../../../components/Page"
// import { QuizContext } from "../Quiz"
// import { Box, Button, Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QuizContext } from "../Quiz";
import { useQuiz } from "../../../api/useQuiz";
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Step, StepLabel, Stepper, Typography } from "@mui/material";

export const Questions = () => {
	const { external_key } = useParams();
	const quizContext = useContext(QuizContext);
	const { getQuestions } = useQuiz();
	const [ questions, setQuestions ] = useState();
	const [ activeStep, setActiveStep ] = useState(0);
	const [ resultIds, setResultIds ] = useState([]);
	const [ resultId, setResultId ] = useState(null);

	useEffect(() => {
		if (quizContext?.id) {
			getQuestions(quizContext.id).then(data => {
				// setQuiz(data);
				const sorted = data.sort((a, b) => a.number - b.number);
				console.log(sorted);
				setQuestions(sorted);
			})
		}
		
	},[quizContext])

	useEffect(() => {
		if (activeStep == questions?.length) {
			// Calculate result ids score
			const scoreBoard = [];
			for (const resultId of resultIds) {
				if (!scoreBoard[resultId]) {
					scoreBoard[resultId] = 1;
				} else {
					scoreBoard[resultId] += 1;
				}
			}

			// Find most frequent highest score results ids
			let mostFrequentResultIds = [];
			for (const result in scoreBoard) {
				if (!mostFrequentResultIds.length) {
					mostFrequentResultIds.push(result);
				} else {
					if (scoreBoard[result] > scoreBoard[mostFrequentResultIds[0]]) {
						mostFrequentResultIds = [result];
					} else if (scoreBoard[result] == scoreBoard[mostFrequentResultIds[0]]) {
						mostFrequentResultIds.push(result);
					}
				}
			}

			// Choose one of multiple highest scored result ids
			let resultId = mostFrequentResultIds[0];
			if (mostFrequentResultIds.length > 1) {
				resultId = mostFrequentResultIds[Math.floor(Math.random() * mostFrequentResultIds.length)];
			}

			setResultId(resultId);
			console.log(resultId);

			// const mostScoredResults = [];
			// const lastResult = null;
			// for (const result in scoreBoard) {
			// 	if (!lastResult) {
			// 		lastResult = result;
			// 		mostScoredResults.push(result);
			// 	} else {
			// 		// if ()
			// 	}
			// 	console.log(result);
			// }

			// console.log(scoreBoard);
			// console.log('finish');
			// console.log(resultIds);
		}
	}, [activeStep]);

	// useEffect(() => {
	// 	console.log(resultIds);
	// }, [resultIds])

	const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
	const handleNext = (resultIds) => {
		setResultIds(ids => ids.concat(resultIds));
		setActiveStep((prevActiveStep) => prevActiveStep + 1)

		// if (activeStep)
		// console.log(activeStep);
		// console.log(questions?.length);
	};


	return <>
		{questions && 
			 <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
				<Stepper activeStep={activeStep}>
					{questions.map((question, index) => {
						return <Step key={index}>
							<StepLabel />
						</Step>

					})}
				</Stepper>
				<Box sx={{py: 3}}>
					{activeStep === questions.length ? 
						(
							<Fragment>
								<Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
									All questions answered!
								</Typography>
								{!resultId 
									? 
										<Typography>Calculating result...</Typography>
									:
										<Button component={Link} to={`/quiz/${external_key}/result/${resultId}`} sx={{my: 3, py: 2, "&:hover": { color: "#fff" }}} variant="contained" onClick={handleNext}>
											See result
										</Button>
								}
								{/* <Button component={Link} to="/" size="large" variant="outlined">Back to list</Button> */}
								
							</Fragment>
						) : (
							<Fragment>
								<Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{questions[activeStep].title}</Typography>
								<List>
									{questions[activeStep].answers.map((answer, index) => 
										<ListItemButton key={index} onClick={() => handleNext(answer.results.map(result => result.id))} sx={{border: '2px dashed #dfd8d8', margin: 1, borderRadius: '20px'}}>
											<ListItem>
												<ListItemText primary={<Typography variant="body1" sx={{fontWeight: 500}}> {answer.title}</Typography>} />
											</ListItem>
										</ListItemButton>
									)}
								</List>
								{/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
									<Button
										color="inherit"
										disabled={activeStep === 0}
										onClick={handleBack}
										sx={{ mr: 1 }}
									>
										Back
									</Button>
									<Box sx={{ flex: '1 1 auto' }} />
									<Button onClick={handleNext}>
										{activeStep === questions.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</Box> */}
							</Fragment>
						)
					}
				</Box>
			</Box>
		}
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
			<Button size="large" variant="contained">Start Quiz</Button>
		</Stack> */}
	</>
}