const apiUrl = process.env.REACT_APP_API_ENDPOINT + 'api/'

const QUIZ_PREFIX = apiUrl + 'quiz/'

const Endoints = {
	quiz: {
		root: QUIZ_PREFIX,
		result: QUIZ_PREFIX + 'result/'
	}
}

export default Endoints