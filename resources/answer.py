from models.answer import Answer
from flask_restful import Resource, reqparse
from db import db

parser = reqparse.RequestParser()
parser.add_argument('value', type=str)


class AnswerByIdAPI(Resource):

    def get(self, answer_id):
        answer = None
        try:
            answer = Answer.query.filter_by(id=answer_id).first()
            if answer is None:
                return {'message': 'Not found error occurred'}, 404, {'Content-Type': 'application/json'}
        except Exception:
            return {'message': 'Internal server error occurred'}, 500, {'Content-Type': 'application/json'}
        return answer.to_dict(), 200, {'Content-Type': 'application/json'}

    def delete(self, answer_id):
        answer = None
        try:
            answer = Answer.query.filter_by(id=answer_id).first()
            if answer is None:
                return {'message': 'Not found error occurred'}, 404, {'Content-Type': 'application/json'}
            db.session.delete(answer)
            db.session.commit()
        except Exception:
            return {'message': 'Internal server error occurred'}, 500, {'Content-Type': 'application/json'}
        return {'': ''}, 204, {'Content-Type': 'application/json'}


class AnswerAPI(Resource):

    def get(self):
        answers = None
        try:
            answers = Answer.query.all()
            if answers is None:
                return {'message': 'Not found error occurred'}, 404, {'Content-Type': 'application/json'}
        except Exception:
            return {'message': 'Internal server error occurred'}, 500, {'Content-Type': 'application/json'}
        return [a.to_dict() for a in answers], 200, {'Content-Type': 'application/json'}

    def post(self):
        # todo: error handling in this method + data validation
        try:
            args = parser.parse_args()
            answer = Answer(args['value'])
            answer.save_to_db()
        except Exception:
            return {'message': 'Internal server error occurred'}, 500, {'Content-Type': 'application/json'}
        return {'message': 'created successfully'}, 201, {'Content-Type': 'application/json'}
