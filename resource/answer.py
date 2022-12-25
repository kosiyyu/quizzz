from flask_restful import Resource
from flask import jsonify


class AnswerResource(Resource):
    def get(self):
        a = {'value': 'hello world'}
        return jsonify(a)
