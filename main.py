from flask import Flask
from flask_restful import Api
from config import DATABASE_CONFIG
from resources.answer import AnswerAPI, AnswerByIdAPI

app = Flask(__name__)

db_url = f"{DATABASE_CONFIG['provider']}://{DATABASE_CONFIG['username']}:{DATABASE_CONFIG['password']}@{DATABASE_CONFIG['host']}:{DATABASE_CONFIG['port']}/{DATABASE_CONFIG['database']}"
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

with app.app_context():
    from db import db

    # init db
    db.init_app(app)
    # Create the database tables
    db.create_all()

api = Api(app)

api.add_resource(AnswerAPI, '/api/answers')
api.add_resource(AnswerByIdAPI, '/api/answers/<int:answer_id>')

if __name__ == '__main__':
    app.run(debug=True)
