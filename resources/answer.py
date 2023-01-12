from flask_restful import Resource, reqparse
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models.answer import Answer

parser = reqparse.RequestParser()
parser.add_argument('text', type=str)
parser.add_argument('correct', type=bool)
parser.add_argument('question_id', type=int)


class AnswerByIdAPI(Resource):

    def get(self, answer_id):
        try:
            answer = Answer.query.filter_by(id=answer_id).first()
            if answer is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return answer.to_dict(), 200, {'Content-Type': 'application/json'}

    def delete(self, answer_id):
        try:
            answer = Answer.query.filter_by(id=answer_id).first()
            if answer is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
            db.session.delete(answer)
            db.session.commit()
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return {'': ''}, 204, {'Content-Type': 'application/json'}


class AnswerAPI(Resource):

    def get(self):
        try:
            answers = Answer.query.all()
            if answers is None:
                return {'message': 'The requested resource could not be found for the provided ID.'}, 404, {
                    'Content-Type': 'application/json'}
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return [a.to_dict() for a in answers], 200, {'Content-Type': 'application/json'}

    def post(self):
        try:
            args = parser.parse_args()
            # validation (part of it is being handled by reqparse, that returns correct types)
            if not all(key in args for key in ('text', 'correct', 'question_id')):
                return {
                           'message': 'The request is missing one or more required fields. Please check the request and try again.'}, 400, {
                           'Content-Type': 'application/json'}
            answer = Answer(text=args['text'], correct=args['correct'], question_id=args['question_id'])
            db.session.add(answer)
            db.session.commit()
        except SQLAlchemyError:
            return {
                       'message': 'An unexpected error occurred while processing the request. Please try again later.'}, 500, {
                       'Content-Type': 'application/json'}
        return {'message': 'Resource created successfully.'}, 201, {'Content-Type': 'application/json'}
