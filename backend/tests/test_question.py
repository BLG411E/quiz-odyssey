import uuid
tester_id = uuid.uuid4()

def test_submit(client, users):
    # Test submitting a question
    response = client.post(
        "/question/submit",
        headers={"Token": f"{users[0]['token']}"},
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
            "email": f"tester_{tester_id}@test.com",

            "category": 16,
            "text": "text",
            "option1": "option1",
            "option2": "option2",
            "correctAnswer": 1,
            "explanation": "explanation",
            "difficulty": 1,
        },
    )
    assert response.status_code == 200

    # Test submitting a question with not existing category question
    response = client.post(
        "/question/submit",
        headers={"Token": f"{users[0]['token']}"},
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
            "email": f"tester_{tester_id}@test.com",

            "category": 1000,
            "text": "text",
            "option1": "option1",
            "option2": "option2",
            "correctAnswer": 1,
            "explanation": "explanation",
            "difficulty": 1,
        },
    )
    assert response.status_code == 400

     # Test submitting a question with lacking field 
    response = client.post(
        "/question/submit",
        headers={"Token": f"{users[0]['token']}"},
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
            "email": f"tester_{tester_id}@test.com",

            "text": "text",
            "option1": "option1",
            "option2": "option2",
            "correctAnswer": 1,
            "explanation": "explanation",
            "difficulty": 1,
        },
    )
    assert response.status_code == 400

    # Test submitting a question with invalid user token
    response = client.post(
        "/question/submit",
        headers={"Token": f"{users[0]}"},
        json={
            "username": f"tester_{tester_id}",
            "password": "testpassword",
            "email": f"tester_{tester_id}@test.com",

            "category": 16,
            "text": "text",
            "option1": "option1",
            "option2": "option2",
            "correctAnswer": 1,
            "explanation": "explanation",
            "difficulty": 1,
        },
    )
    assert response.status_code == 401


