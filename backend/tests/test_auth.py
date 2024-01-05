import uuid

tester_id = uuid.uuid4()


def test_register(client):
    # Test creating a new user
    response = client.post(
        "/auth/register",
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
            "email": f"tester_{tester_id}@test.com",
        },
    )
    assert response.status_code == 201
    assert response.json["token"] is not None

    # Test creating a user with the same username, different email
    response = client.post(
        "/auth/register",
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
            "email": f"tester_{tester_id}_2@test.com",
        },
    )
    assert response.status_code == 400
    assert response.json["msg"] == "A user with this username already exists"

    # Test creating a user with the same email, different username
    response = client.post(
        "/auth/register",
        json={
            "username": f"tester_{tester_id}_2",
            "password": "testpassword",
            "email": f"tester_{tester_id}@test.com",
        },
    )
    assert response.status_code == 400
    assert response.json["msg"] == "Email is already registered"

    # Test creating a user with missing parameters
    response = client.post(
        "/auth/register",
        json={"password": "testpassword", "email": f"tester_{tester_id}_2@test.com"},
    )
    assert response.status_code == 400
    assert response.json["msg"] == "Missing required parameters"


def test_login(client):
    # Test logging in with a non-existent user
    response = client.post(
        "/auth/login",
        json={
            "username": f"tester_{tester_id}_nonexistent",
            "password": "testpassword",
        },
    )
    assert response.status_code == 400
    assert response.json["msg"] == "Invalid username"

    # Test logging in with a wrong password
    response = client.post(
        "/auth/login",
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword_0",
        },
    )
    assert response.status_code == 401
    assert response.json["msg"] == "Invalid credentials"

    # Test logging in without a password
    response = client.post(
        "/auth/login",
        json={
            "username": f"tester_{tester_id}",
        },
    )
    assert response.status_code == 400
    assert response.json["msg"] == "Missing required parameters"

    # Test logging in with an existing user
    response = client.post(
        "/auth/login",
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
        },
    )
    assert response.status_code == 200
    assert response.json["token"] is not None
