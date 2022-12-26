from flask import Flask
from config import DATABASE_CONFIG
from service.AnswerService import AnswerService

app = Flask(__name__)

db_url = f"{DATABASE_CONFIG['provider']}://{DATABASE_CONFIG['username']}:{DATABASE_CONFIG['password']}@{DATABASE_CONFIG['host']}:{DATABASE_CONFIG['port']}/{DATABASE_CONFIG['database']}"
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

with app.app_context():
    from db import db

    db.init_app(app)
    db.create_all()


# ROUTES
@app.route('/', methods=['GET'])
def get_all_answers():
    return AnswerService.get_all_answers()


@app.route('/<int:answer_id>', methods=['GET'])
def get_answer(answer_id):
    return AnswerService.get_answer(answer_id)


@app.route('/', methods=['POST'])
def post_answer():
    return AnswerService.post_answer()


@app.route('/<int:answer_id>', methods=['DELETE'])
def delete_id(answer_id):
    return AnswerService.delete_answer(answer_id)


if __name__ == '__main__':
    app.run(debug=True)
