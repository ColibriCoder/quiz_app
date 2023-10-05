import logo from './logo.svg';
import './App.css';
import Page from './components/Page';
import { QuizList } from './pages/QuizList';
import { Quiz } from './pages/quiz/Quiz';
import { Intro as QuizIntro} from './pages/quiz/partials/Intro';
import { Questions as QuizQuestions} from './pages/quiz/partials/Questions';
import { Result as QuizResult } from './pages/quiz/partials/Result';


import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <QuizList />
	},
	{
		// path: '/quiz/:external_key',
		element: <Quiz />,
		children: [
			{
				path: '/quiz/:external_key',
				element: <QuizIntro />,
			},
			{
				path: '/quiz/:external_key/quiz',
				element: <QuizQuestions />,
			},
			{
				path: '/quiz/:external_key/result/:result_id',
				element: <QuizResult />,
			}
		]
	}
])

function App() {
	return <RouterProvider router={router} />
}

export default App;
