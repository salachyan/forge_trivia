import React from 'react'

const TriviaApp = () => {
    const [questions, setQuestions] = useState([])
useEffect(()=> {
    const fetchData = async() => {
        const result = await fetch("https://the-trivia-api.com/v2/questions");
        const resultJson = await result.json()
        setQuestions(resultJson.results)
        }
    fetchData();
},[])

  return (
    <h1>Trvia App</h1>
  )
}

export default TriviaApp
