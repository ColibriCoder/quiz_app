import Endoints from "./Endpoints"


export const useQuiz = () => {
	const getQuizList = () => fetch(Endoints.quiz.root).then(resp => resp.json())

	const getQuiz = (external_key) => fetch(Endoints.quiz.root + external_key).then(resp => resp.json())

	const getQuestions = (quizId) => fetch(Endoints.quiz.root + quizId +  '/questions').then(resp => resp.json())

	const getResult = (resultId) => fetch(Endoints.quiz.result + resultId).then(resp => resp.json())
	
	return {
		getQuizList,
		getQuiz,
		getQuestions,
		getResult
	}
}