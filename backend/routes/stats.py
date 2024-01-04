from flask import Blueprint, jsonify
from sqlalchemy import func
from datetime import datetime, timedelta
from ..models import User, Score, Category  # Import necessary models
from ..authutils import require_token
from ..extensions import db
stats = Blueprint("stats", __name__)

@stats.route('/<username>', methods=['GET'])
@require_token
def get_user_stats(username):
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    try:    
        user_stats = (
            db.session.query(
                Category.name,
                func.sum(Score.score).label('total_category_score')
            )
            .join(Score, Score.category == Category.id)
            .where(Score.user == user.id)
            .group_by(Category.name)
            .all()
        )
    except Exception as e:
        return jsonify({'error': 'Error getting user stats', 'message': str(e)}), 500

    user_stat_dict = {
        'username': user.username,
        'total_score': user.totalScore,
        'streak_count': user.streakCount,
        'category_stats': [{ 'category_name': category_name, 'total_category_score': total_category_score }
                           for category_name, total_category_score in user_stats]
    }

    return jsonify(user_stat_dict), 200

@stats.route('/weekly/<username>', methods=['GET'])
@require_token
def get_user_weekly_stats(username):
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Calculate the start of the week
    today = datetime.utcnow()
    start_of_week = today - timedelta(days=today.weekday())

    try:
        user_weekly_stats = (
            db.session.query(
                Category.name,
                func.sum(Score.score).label('total_category_score')
            )
            .join(Score, Score.category == Category.id)
            .where(Score.user == user.id)
            .where(Score.obtainedAt >= start_of_week)
            .group_by(Category.name)
            .all()
        )
    except Exception as e:
        return jsonify({'error': 'Error getting user weekly stats', 'message': str(e)}), 500
    
    user_weekly_stat_dict = {
        'username': user.username,
        'start_of_week': start_of_week.strftime('%Y-%m-%d'),
        'category_stats': [{ 'category_name': category_name, 'total_category_score': total_category_score }
                           for category_name, total_category_score in user_weekly_stats]
    }

    return jsonify(user_weekly_stat_dict), 200
