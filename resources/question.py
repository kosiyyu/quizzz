from sqlalchemy.exc import SQLAlchemyError
from flask_restful import Resource, reqparse
from db import db
from models.question import Question

parser = reqparse.RequestParser()
parser.add_argument('text', type=str)
parser.add_argument('points_per_correct_answer', type=float)
parser.add_argument('quiz_id', type=int)


class QuestionByIdAPI(Resource):

    def get(self, question_id):
        try:
            question = Question.query.filter_by(id=question_id).first()
            if question is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {'Content-Type': 'application/json'}
        return question.to_dict(), 200, {'Content-Type': 'application/json'}

    def delete(self, question_id):
        try:
            question = Question.query.filter_by(id=question_id).first()
            if question is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {'Content-Type': 'application/json'}
            db.session.delete(question)
            db.session.commit()
        except SQLAlchemyError:
            return {'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {'Content-Type': 'application/json'}
        return {'': ''}, 204, {'Content-Type': 'application/json'}


class QuestionAPI(Resource):
    def get(self):
        try:
            questions = Question.query.all()
            if questions is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {'Content-Type': 'application/json'}
        return [q.to_dict() for q in questions], 200, {'Content-Type': 'application/json'}

    def post(self):
        try:
            args = parser.parse_args()
            if not all(key in args for key in ('text', 'points_per_correct_answer', 'quiz_id')):
                return {'message': 'The request is missing one or more required fields. Please check the request and try again.'}, 400, {'Content-Type': 'application/json'}
            question = Question(text=args['text'], points_per_correct_answer=args['points_per_correct_answer'], quiz_id=args['quiz_id'])
            db.session.add(question)
            db.session.commit()
        except SQLAlchemyError:
            return {'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {'Content-Type': 'application/json'}
        return question.to_dict(), 201, {'Content-Type': 'application/json'}
