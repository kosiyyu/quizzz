from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models.quiz import Quiz
from models.result import Result


class ResultAPI(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('quiz_id', type=int, required=True)
    parser.add_argument('answers', type=list, required=True, location='json')

    def post(self):
        try:
            args = self.parser.parse_args()
            answers = [{'question_id': q['question_id'], 'answer_id': q['answer_id']} for q in args['answers']]
            solved_quiz = Result(quiz_id=args['quiz_id'], answers=answers)
            solved_quiz.score = self.score_quiz(solved_quiz)
            db.session.add(solved_quiz)
            db.session.commit()
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return {'message': 'Resource created successfully.'}, 201, {'Content-Type': 'application/json'}

    def score_quiz(self, solved_quiz):
        quiz = Quiz.query.filter_by(id=solved_quiz.quiz_id).first()
        if quiz is None:
            raise Exception("quiz not found")
        score = 0
        max_score = 0
        for i, question in enumerate(quiz.questions):
            points_per_correct_answer = question.points_per_correct_answer
            max_score += points_per_correct_answer
            for answer in solved_quiz.answers:
                if answer["question_id"] == question.id:
                    for ans in question.answers:
                        if ans.id == answer["answer_id"] and ans.correct:
                            score += points_per_correct_answer
                            break
        return (score / max_score) * 100

    def get(self):
        try:
            results = Result.query.all()
            if results is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return [q.to_dict() for q in results], 200, {'Content-Type': 'application/json'}