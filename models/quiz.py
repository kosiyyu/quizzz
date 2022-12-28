from db import db


class Quiz(db.Model):
    __tablename__ = 'quizzes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))

    questions = db.relationship("Question", back_populates="quiz")

    def __init__(self, name=None):
        self.name = name

    def to_dict(self):
        return {'id': self.id, 'name': self.name}









