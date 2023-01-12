from db import db


class Quiz(db.Model):
    __tablename__ = 'quizzes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    questions = db.relationship("Question", back_populates="quiz", cascade='all, delete, delete-orphan', lazy=True)

    def __init__(self, name=None):
        self.name = name

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'questions': [q.to_dict() for q in self.questions]}


