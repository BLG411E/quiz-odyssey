import uuid


def test_follow(client, users):
    # Test following a user
    response = client.post(
        f"/social/follow/{users[1]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert response.json["msg"] == "Followed successfully"

    # Test following a user that doesn't exist
    response = client.post(
        f"/social/follow/{uuid.uuid4()}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json["msg"] == "User does not exist"

    # Test following a user that you already follow
    response = client.post(
        f"/social/follow/{users[1]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 400
    assert response.json["msg"] == "Already following"

    # Test following yourself
    response = client.post(
        f"/social/follow/{users[0]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 400
    assert response.json["msg"] == "Cannot follow yourself"


def test_unfollow(client, users):
    client.post(
        f"/social/follow/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )

    # Test unfollowing a user
    response = client.delete(
        f"/social/follow/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert response.json["msg"] == "Unfollowed successfully"

    # Test unfollowing a user that you don't follow
    response = client.delete(
        f"/social/follow/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json["msg"] == "Not following user"

    # Test unfollowing a user that doesn't exist
    response = client.delete(
        f"/social/follow/{uuid.uuid4()}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json["msg"] == "User does not exist"


def test_followers(client, users):
    # Follow user 0 from user 2
    client.post(
        f"/social/follow/{users[0]['username']}",
        headers={"Token": f"{users[2]['token']}"},
    )

    # Test getting followers
    response = client.get(
        "/social/followers?page=1",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert len(response.json["results"]) > 0
    assert users[2]["username"] in response.json["results"]

    # Unfollow user 0 from user 2
    client.delete(
        f"/social/follow/{users[0]['username']}",
        headers={"Token": f"{users[2]['token']}"},
    )

    # Test getting followers
    response = client.get(
        "/social/followers?page=1",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert users[2]["username"] not in response.json["results"]


def test_following(client, users):
    # Follow user 2 from user 0
    client.post(
        f"/social/follow/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )

    # Test getting following
    response = client.get(
        "/social/following?page=1",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert len(response.json["results"]) > 0
    assert users[2]["username"] in response.json["results"]

    # Unfollow user 2 from user 0
    client.delete(
        f"/social/follow/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )

    # Test getting following
    response = client.get(
        "/social/following?page=1",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert users[2]["username"] not in response.json["results"]


def test_remove_follower(client, users):
    # Follow user 0 from user 2
    client.post(
        f"/social/follow/{users[0]['username']}",
        headers={"Token": f"{users[2]['token']}"},
    )

    # Test removing follower
    response = client.delete(
        f"/social/followers/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 200
    assert response.json["msg"] == "Removed follower successfully"

    # Test removing follower that doesn't exist
    response = client.delete(
        f"/social/followers/{users[2]['username']}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json["msg"] == "Not followed by user"

    # Test removing a user that doesn't exist
    response = client.delete(
        f"/social/followers/{uuid.uuid4()}",
        headers={"Token": f"{users[0]['token']}"},
    )
    assert response.status_code == 404
    assert response.json["msg"] == "User does not exist"
