import uuid


def test_get_user_stats(client, users):
    # Test getting user stats
    response = client.get(
        f"/stats/{users[1]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200


    # Test getting user stats when username is not provided
    response = client.get(
        f"/stats",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404

    # Test getting user stats when no token is provided
    response = client.get(
        "/stats/Boris1991",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json['error'] == "User not found"

    response = client.get(
        f"/stats/{users[1]['username']}",

    )
    assert response.status_code == 401

def test_get_user_weekly_stats(client, users):
    # Test getting weekly user stats
    response = client.get(
        f"/stats/weekly/{users[1]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200


    # Test getting weekly user stats when username is not provided
    response = client.get(
        f"/stats/weekly/",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404

    # Test getting weekly user stats when username does not exist
    response = client.get(
        "/stats/weekly/Boris1991",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json['error'] == "User not found"

    # Test getting weekly user stats when no token is provided
    response = client.get(
       f"/stats/weekly/{users[1]['username']}",

    )
    assert response.status_code == 401

    





