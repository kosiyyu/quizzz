from db import db


class Answer(db.Model):
    __tablename__ = 'answers'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    correct = db.Column(db.Boolean, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    question = db.relationship("Question", back_populates="answers")

    def __init__(self, text=None, correct=None, question_id=None):
        self.text = text
        self.correct = correct
        self.question_id = question_id

    def to_dict(self):
        return {'id': self.id, 'text': self.text, 'correct': self.correct, 'question_id': self.question_id}
