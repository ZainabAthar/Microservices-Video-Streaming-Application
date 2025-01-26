from locust import HttpUser, between, task

class MicroservicesUser(HttpUser):
    wait_time = between(1, 5)

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.register_user()
        self.login_user()

    
    def login_user(self):
        response = self.client.post("/api/users/login", json={
            "email": "umair@gmail.com",
            "password": "asdf1234"
        })
        self.token = response.json()['token']

    @task
    def get_gallery(self):
        # Assuming the userID is known and is '12345'
        self.client.get("/images/6591b9306901f8481900825e", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def add_image(self):
        # Assuming the userID is known and is '12345'
        # and 'image_data' is the data of the image to be uploaded
        self.client.post("/images/add/6591b9306901f8481900825e", files={
            "images": ("filename", "image_data", "image/jpeg")
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def delete_image(self):
        # Assuming the userID is '12345' and imageID is '67890'
        self.client.delete("/images/6591b9306901f8481900825e/67890", headers={
            "Authorization": f"Bearer {self.token}"

})
