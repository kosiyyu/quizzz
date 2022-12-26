from model.answer import Answer
from flask_restful import reqparse
from db import db


class AnswerService:
    parser = reqparse.RequestParser()
    parser.add_argument('value', type=str)

    @staticmethod
    def get_all_answers():
        answers = Answer.query.all()
        return [a.to_dict() for a in answers], 200, {'Content-Type': 'application/json'}

    @staticmethod
    def get_answer(answer_id):
        answer = Answer.query.filter_by(id=answer_id).first()
        return answer.to_dict(), 200, {'Content-Type': 'application/json'}

    @staticmethod
    def post_answer():
        args = AnswerService.parser.parse_args()
        print(args)
        answer = Answer(args['value'])
        answer.save_to_db()
        return 'created', 201, {'Content-Type': 'application/json'}

    @staticmethod
    def delete_answer(answer_id):
        Answer.query.filter_by(id=answer_id).delete()
        db.session.commit()
        return 'deleted', 204, {'Content-Type': 'application/json'}
