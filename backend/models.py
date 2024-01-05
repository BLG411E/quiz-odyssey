from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    CheckConstraint
)
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import mapped_column
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "User"

    id = mapped_column(Integer, primary_key=True)
    username = mapped_column(String, nullable=False, unique=True)
    email = mapped_column(String, nullable=False, unique=True)
    phone = mapped_column(String, nullable=True, unique=True)
    passwordHash = mapped_column(String, nullable=False)
    registeredAt = mapped_column(DateTime, server_default=func.now())
    totalScore = mapped_column(Integer, default=0)
    streakCount = mapped_column(Integer, default=0)
    lastQuizTakenAt = mapped_column(DateTime)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
            "registeredAt": self.registeredAt,
            "totalScore": self.totalScore,
            "streakCount": self.streakCount,
            "lastQuizTakenAt": self.lastQuizTakenAt,
        }


class Score(Base):
    __tablename__ = "Score"

    id = mapped_column(Integer, primary_key=True)
    user = mapped_column(Integer, ForeignKey("User.id", ondelete="CASCADE"))
    score = mapped_column(Integer)
    category = mapped_column(Integer, ForeignKey("Category.id"))
    obtainedAt = mapped_column(DateTime, server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user,
            "score": self.score,
            "category": self.category,
            "obtainedAt": self.obtainedAt,
        }


class Category(Base):
    __tablename__ = "Category"

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, unique=True)
    description = mapped_column(Text)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name, 
            "description": self.description
        }


class Follow(Base):
    __tablename__ = "Follow"

    id = mapped_column(Integer, primary_key=True)
    follower = mapped_column(Integer, ForeignKey("User.id", ondelete="CASCADE"))
    followed = mapped_column(Integer, ForeignKey("User.id", ondelete="CASCADE"))
    startedFollowingAt = mapped_column(DateTime, server_default=func.now())

    UniqueConstraint(follower, followed, name="Follow_follower_followed_key")
    CheckConstraint(follower != followed, name="Follow_check")

    def to_dict(self):
        return {
            "id": self.id,
            "follower": self.follower,
            "followed": self.followed,
            "startedFollowingAt": self.startedFollowingAt,
        }


class Question(Base):
    __tablename__ = "Question"

    id = mapped_column(Integer, primary_key=True)
    category = mapped_column(Integer, ForeignKey("Category.id"))
    text = mapped_column(Text)
    option1 = mapped_column(Text)
    option2 = mapped_column(Text)
    option3 = mapped_column(Text)
    option4 = mapped_column(Text)
    correctAnswer = mapped_column(Integer)
    addedAt = mapped_column(DateTime, server_default=func.now())
    addedBy = mapped_column(Integer, ForeignKey("User.id", ondelete="SET NULL"))
    isValid = mapped_column(Boolean, nullable=False, default=False)
    approvedBy = mapped_column(Integer, ForeignKey("Staff.id", ondelete="SET NULL"))
    explanation = mapped_column(Text)
    difficulty = mapped_column(Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "text": self.text,
            "option1": self.option1,
            "option2": self.option2,
            "option3": self.option3,
            "option4": self.option4,
            "correctAnswer": self.correctAnswer,
            "addedAt": self.addedAt,
            "addedBy": self.addedBy,
            "isValid": self.isValid,
            "approvedBy": self.approvedBy,
            "explanation": self.explanation,
            "difficulty": self.difficulty,
        }


class Staff(Base):
    __tablename__ = "Staff"

    id = mapped_column(Integer, primary_key=True)
    username = mapped_column(String, nullable=False, unique=True)
    passwordHash = mapped_column(String, nullable=False)
    hasAdminPriveleges = mapped_column(Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "hasAdminPriveleges": self.hasAdminPriveleges,
        }
    