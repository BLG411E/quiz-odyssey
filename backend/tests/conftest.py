import pytest

from backend import create_app


@pytest.fixture()
def app():
    app = create_app(use_socketio=False)
    app.config.update(
        {
            "TESTING": True,
        }
    )

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


@pytest.fixture()
def users(client):
    users = []

    for i in range(1, 4):
        response = client.post(
            "/auth/register",
            json={
                "username": f"tester{i}",
                "email": f"tester{i}@test.com",
                "password": "test",
            },
        )

        if response.status_code == 400:
            response = client.post(
                "/auth/login",
                json={
                    "username": f"tester{i}",
                    "password": "test",
                },
            )

        users.append({"username": f"tester{i}", "token": response.json["token"]})

    return users
