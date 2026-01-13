import uuid
from django.db import models

OPPORTUNITY_TYPES = [
    ('scholarship', 'Scholarship'),
    ('fellowship', 'Fellowship'),
    ('training', 'Training'),
    ('funding', 'Funding'),
    ('competition', 'Competition'),
]


class Opportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=255)
    provider = models.CharField(max_length=255) # الجهة المانحة

    type = models.CharField(max_length=100, choices=OPPORTUNITY_TYPES) # Scholarship, Fellowship, Training...

    country = models.CharField(max_length=100)
    deadline = models.DateField()

    description = models.TextField()
    link = models.URLField()

    is_active = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)
    source = models.CharField(max_length=50)  # Official, Partner, Community

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
