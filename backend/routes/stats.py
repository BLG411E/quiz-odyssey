from flask import Blueprint, jsonify
from sqlalchemy import func
from .models import User, Score, Category  # Import necessary models
from .decorators import require_token

stats = Blueprint("stats", __name__)

@stats.route('/user_stats/<username>', methods=['GET'])
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
                Category.name.label('category_name'),
                func.sum(Score.score).label('total_category_score')
            )
            .join(Score, user.id == Score.user_id)
            .join(Category, Category.id == Score.category_id)
            .group_by(Category.name)
            .all()
        )
    except Exception as e:
        return jsonify({'error': 'Error getting user stats', 'message': str(e)}), 500

    user_stat_dict = {
        'username': user.username,
        'total_score': user.total_score,
        'streak_count': user.streak_count,
        'category_stats': [{ 'category_name': category_name, 'total_category_score': total_category_score }
                           for category_name, total_category_score in user_stats]
    }

    return jsonify(user_stat_dict), 200
