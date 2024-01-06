from ..extensions import db 
from .. import models

def test_list_categories(client, users):
    # Test if number of categories is correct
    number_of_categories = db.session.query(models.Category).count()
    response = client.get(
        "/category/list",
    )
    assert response.status_code == 200
    assert len(response.json) == number_of_categories
