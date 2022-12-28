from db import db
from models.quiz import Quiz


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.String(255))
    points_per_correct_answer = db.Column(db.Float, nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'))

    answers = db.relationship("Answer", back_populates="question")
    quiz = db.relationship("Quiz", back_populates="questions")

    def __init__(self, text=None, points_per_correct_answer=None, quiz_id=None):
        self.text = text
        self.points_per_correct_answer = points_per_correct_answer
        self.quiz_id = quiz_id

    def to_dict(self):
        return {'id': self.id, 'text': self.text, 'points_per_correct_answer': self.points_per_correct_answer, 'quiz_id': self.quiz_id}


