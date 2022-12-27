from db import db


class Answer(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    value = db.Column(db.String(255))

    def __init__(self, value):
        self.value = value

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.remove(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def find_by_id(cls, id):
        answer = Answer.query.filter(Answer.id == id).delete()
        return answer

    def to_dict(self):
        return {'id': self.id, 'value': self.value}
