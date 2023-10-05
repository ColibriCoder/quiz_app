import { Fragment, useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { QuizContext } from "../Quiz"
import { useQuiz } from "../../../api/useQuiz"
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Step, StepLabel, Stepper, Typography } from "@mui/material"
import Loader from "../../../components/Loader"

export const Questions = () => {
	const { external_key } = useParams()
	const quizContext = useContext(QuizContext)
	const { getQuestions } = useQuiz()
	const [ questions, setQuestions ] = useState()
	const [ activeStep, setActiveStep ] = useState(0)
	const [ resultIds, setResultIds ] = useState([])
	const [ resultId, setResultId ] = useState(null)

	useEffect(() => {
		if (quizContext?.id) {
			getQuestions(quizContext.id).then(data => {
				const sorted = data.sort((a, b) => a.number - b.number)
				setQuestions(sorted)
			})
		}
		
	},[quizContext])

	useEffect(() => {
		if (activeStep == questions?.length) {
			// Calculate result ids score
			const scoreBoard = [];
			for (const resultId of resultIds) {
				if (!scoreBoard[resultId]) {
					scoreBoard[resultId] = 1
				} else {
					scoreBoard[resultId] += 1
				}
			}

			// Find most frequent highest score results ids
			let mostFrequentResultIds = []
			for (const result in scoreBoard) {
				if (!mostFrequentResultIds.length) {
					mostFrequentResultIds.push(result)
				} else {
					if (scoreBoard[result] > scoreBoard[mostFrequentResultIds[0]]) {
						mostFrequentResultIds = [result]
					} else if (scoreBoard[result] == scoreBoard[mostFrequentResultIds[0]]) {
						mostFrequentResultIds.push(result)
					}
				}
			}

			// Choose one of multiple highest scored result ids
			let resultId = mostFrequentResultIds[0]
			if (mostFrequentResultIds.length > 1) {
				resultId = mostFrequentResultIds[Math.floor(Math.random() * mostFrequentResultIds.length)]
			}

			setResultId(resultId)
		}
	}, [activeStep])

	// const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
	const handleNext = (resultIds) => {
		setResultIds(ids => ids.concat(resultIds))
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	};


	return <>
		{questions  
			?
				<Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
					<Stepper activeStep={activeStep}>
						{questions.map((question, index) => 
							<Step key={index}>
								<StepLabel />
							</Step>
						)}
					</Stepper>
					<Box sx={{py: 3}}>
						{activeStep === questions.length ? 
							(
								<Fragment>
									<Typography variant="h6" sx={{  fontWeight: 400, mt: 2, mb: 1 }}>
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
								</Fragment>
							) : (
								<Fragment>
									<Typography variant="h6" sx={{ fontWeight: 400, mt: 2, mb: 1 }}>{questions[activeStep].title}</Typography>
									<List>
										{questions[activeStep].answers.map((answer, index) => 
											<ListItemButton key={index} onClick={() => handleNext(answer.results.map(result => result.id))} sx={{border: '2px dashed #dfd8d8', margin: 1, borderRadius: '20px'}}>
												<ListItem>
													<ListItemText primary={<Typography variant="body1" sx={{fontWeight: 500}}> {answer.title}</Typography>} />
												</ListItem>
											</ListItemButton>
										)}
									</List>
								</Fragment>
							)
						}
					</Box>
				</Box>
			: <Loader />
		}
	</>
}