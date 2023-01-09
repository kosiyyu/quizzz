from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import cross_origin
from db import db
from models.quiz import Quiz

parser = reqparse.RequestParser()
parser.add_argument('name', type=str)


class QuizByIdAPI(Resource):
    def options(self):
        return {'Allow': 'GET, DELETE'}, 200, {'Access-Control-Allow-Origin': '*',
                                               'Access-Control-Allow-Methods': 'GET, DELETE',
                                               'Access-Control-Allow-Headers': 'Content-Type'}

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

    def options(self):
        return {'Allow': 'GET, POST'}, 200, {'Access-Control-Allow-Origin': '*',
                                             'Access-Control-Allow-Methods': 'GET, POST',
                                             'Access-Control-Allow-Headers': 'Content-Type'}

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
            quiz = Quiz(name=args['name'])
            db.session.add(quiz)
            db.session.commit()
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return quiz.to_dict(), 201, {'Content-Type': 'application/json'}
