from models.answer import Answer
from flask_restful import Resource, reqparse
from db import db

parser = reqparse.RequestParser()
parser.add_argument('value', type=str)


class AnswerByIdAPI(Resource):

    def get(self, answer_id):
        answer = Answer.query.filter_by(id=answer_id).first()
        if answer is None:
            return 'error', 404, {'Content-Type': 'application/json'}
        return answer.to_dict(), 200, {'Content-Type': 'application/json'}

    def delete(self, answer_id):
        answer = Answer.query.filter_by(id=answer_id).first()
        if answer is None:
            return 'error', 404, {'Content-Type': 'application/json'}
        try:
            db.session.delete(answer)
            db.session.commit()
        except Exception:
            return 'error', 404, {'Content-Type': 'application/json'}
        return '', 204, {'Content-Type': 'application/json'}


class AnswerAPI(Resource):

    def get(self):
        answers = Answer.query.all()
        if answers is None:
            return 'error', 404, {'Content-Type': 'application/json'}
        return [a.to_dict() for a in answers], 200, {'Content-Type': 'application/json'}

    def post(self):
        args = parser.parse_args()
        answer = Answer(args['value'])
        answer.save_to_db()
        return 'created', 201, {'Content-Type': 'application/json'}
