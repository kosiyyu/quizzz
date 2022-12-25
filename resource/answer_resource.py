from flask_restful import Resource, reqparse, request
from flask import jsonify, Response
from model.answer import Answer


class AnswerResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('value', type=str)

    def get(self, id):
        result = Answer.q

        a = {'value': 'hello world'}
        # answer = Answer()
        return jsonify(a)

    def post(self):
        args = AnswerResource.parser.parse_args()
        answer = Answer(args['value'])
        answer.save_to_db()
        return Response("created", status=201, mimetype='application/json')

