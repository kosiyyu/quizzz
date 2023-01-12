from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models.answer import Answer
from models.question import Question
from models.quiz import Quiz

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)
parser.add_argument('questions', type=list, location='json')


class QuizByIdAPI(Resource):
    def get(self, quiz_id):
        try:
            quiz = Quiz.query.filter_by(id=quiz_id).first()
            if quiz is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return quiz.to_dict(), 200, {'Content-Type': 'application/json'}

    def delete(self, quiz_id):
        try:
            quiz = Quiz.query.filter_by(id=quiz_id).first()
            if quiz is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
            db.session.delete(quiz)
            db.session.commit()
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return {'': ''}, 204, {'Content-Type': 'application/json'}


class QuizAPI(Resource):
    def get(self):
        try:
            quizzes = Quiz.query.all()
            if quizzes is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return [q.to_dict() for q in quizzes], 200, {'Content-Type': 'application/json'}

    def post(self):
        try:
            args = parser.parse_args()
            if not all(key in args for key in ('name',)):
                return {
                           'message': 'The request is missing one or more required fields. Please check the request and try again.'}, 400, {
                           'Content-Type': 'application/json'}
            questions_args = args.pop('questions', [])
            quiz = Quiz(**args)
            for q_args in questions_args:
                answers_args = q_args.pop('answers', [])
                question = Question(**q_args)
                quiz.questions.append(question)
                for a_args in answers_args:
                    answer = Answer(**a_args)
                    question.answers.append(answer)
            db.session.add(quiz)
            db.session.commit()
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return {'message': 'Resource created successfully.'}, 201, {'Content-Type': 'application/json'}
