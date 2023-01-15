from sqlalchemy.dialects.postgresql import JSONB

from db import db


class Result(db.Model):
    __tablename__ = 'results'
    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    answers = db.Column(JSONB, nullable=False)
    score = db.Column(db.Float, nullable=True)

    def __init__(self, quiz_id=None, answers=None, score=None):
        self.quiz_id = quiz_id
        self.answers = answers
        self.score = score

    def to_dict(self):
        return {
            'id': self.id,
            'quiz_id': self.quiz_id,
            'answers': self.answers,
            'score': self.score,
        }
