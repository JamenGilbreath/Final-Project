import React, { Component } from "react";
import axios from "axios"; 

class QuestionBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBank: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        const questions = response.data.results;
        const formattedQuestions = questions.map((question, index) => ({
          id: index + 1,
          question: question.question,
          options: [...question.incorrect_answers, question.correct_answer],
          answer: question.correct_answer,
        }));
        this.setState({ questionBank: formattedQuestions, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { questionBank, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading questions...</div>;
    } else {
      return (
        <div>
          {questionBank.map((question) => (
            <div key={question.id}>
              <h3>Question {question.id}</h3>
              <p>{question.question}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default QuestionBank;