from flask import Flask
from flask_restful import Api

from config import DATABASE_CONFIG
from resource.answer_resource import AnswerResource
from resource.hello_world import HelloWorld

app = Flask(__name__)

db_url = f"{DATABASE_CONFIG['provider']}://{DATABASE_CONFIG['username']}:{DATABASE_CONFIG['password']}@{DATABASE_CONFIG['host']}:{DATABASE_CONFIG['port']}/{DATABASE_CONFIG['database']}"
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)

with app.app_context():
    from db import db
    db.init_app(app)
    db.create_all()

api.add_resource(HelloWorld, '/api/hello_world')
api.add_resource(AnswerResource, '/api/answers')

if __name__ == '__main__':
    app.run(debug=True)
