import { createContext, useEffect, useState } from "react"
import Page from "../../components/Page"
import { Outlet, useParams } from "react-router-dom"
import { Box } from "@mui/material"
import { useQuiz } from "../../api/useQuiz"

export const QuizContext = createContext()

export const Quiz = () => {
	const { external_key } = useParams()
	const { getQuiz } = useQuiz()
	const [ quiz, setQuiz ] = useState()

	useEffect(() => {
		getQuiz(external_key).then(data => setQuiz(data))
	}, [])

	return <Page>	
		<Box sx={{textAlign: 'center', pt: 10}}>
			<QuizContext.Provider value={quiz}>
				<Outlet />
			</QuizContext.Provider>
		</Box>
    </Page>
}