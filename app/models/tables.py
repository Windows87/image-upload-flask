from dataclasses import dataclass
from app import db

@dataclass
class Image(db.Model):
    __tablename__ = "images"

    id: int
    name: str
    type: str
    filename: str

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    filename = db.Column(db.String)

    def __init__(self, name, type, filename):
        self.name = name
        self.type = type
        self.filename = filename

    def __repr__(self):
        return "<Image %r>" % self.name
        