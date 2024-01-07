import uuid


def test_search_users(client):


    # Test getting search user when user is not found
    response = client.get(
        f"/users/search",
        json={
            "term": "trrafdf451",
        },

    )
    assert response.status_code == 500

def test_get_users_info(client, users):
    # Test getting user info
    response = client.get(
        f"/users/info",
        headers={"Token": f"{users[0]['token']}"},

    )
    assert response.status_code == 200

    # Test getting user info when no token is given
    response = client.get(
        f"/users/info",


    )
    assert response.status_code == 401


def test_change_user_name(client, users):
    # Test change username
    response = client.put(
        f"/users/updateusername",
        headers={"Token": f"{users[0]['token']}"},
        json={
            "newusername": "bro",
        },

    )
    assert response.status_code == 201

    # Test change username when no token is given
    response = client.put(
        f"/users/updateusername",
        json={
            "newusername": "bro",
        },

    )
    assert response.status_code == 401




    
    





