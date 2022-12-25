from db import db

class Answer(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(255))
   # question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
