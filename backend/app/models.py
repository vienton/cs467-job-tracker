import datetime
from django.db import models
from django.db.models.deletion import SET_NULL
from django.db.models.fields import EmailField
from django.db.models.fields.related import ForeignKey, create_many_to_many_intermediary_model
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date
class Job(models.Model):
    JOB_TYPES = (
        ('FT', 'Full Time'),
        ('PT', 'Part Time'),
        ('IT', 'Internship')
    )

    STATES = (('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('HI', 'Hawaii'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming'))


    user = ForeignKey(User, related_name='jobs', null=True, on_delete=models.SET_NULL)
    open_date = models.DateField(default=datetime.date.today())
    job_title = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    description = models.TextField()
    url = models.CharField(max_length=200)
    close_date = models.DateField(default=None)
    requisition_id = models.CharField(max_length=50)
    type = models.CharField(max_length=2, choices=JOB_TYPES, default='FT')
    category = models.CharField(max_length=50, default='software engineer')
    city = models.CharField(max_length=50, default='')
    state = models.CharField(max_length=2, choices=STATES, default='VA')
    remote = models.BooleanField(default=False)
    applied = models.ManyToManyField(User, related_name="applied_jobs",)
    saved = models.ManyToManyField(User, related_name="saved_jobs")
    createdAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.job_title + ", " + self.company
    
    # Might need to evaluate if this works - will empty fields equate to None?
    def is_closed(self):
        return self.close_date != None


class Application(models.Model):
    # STATUS = ('Saved', 'Applied', 'Completed Assessment', 'Interviewed', 'Offered', 'Declined', 'Rejected', 'Ghosted', 'Dead')

    user = models.ForeignKey(User, related_name='applications', on_delete=models.CASCADE)
    # job = models.ForeignKey(Job, on_delete=models.PROTECT)
    applied_date = models.DateField(default=datetime.date.today())
    job_status = models.CharField(max_length=20, default='')

    # refactor: remove these fields and use the Jobs table instead
    job_title = models.CharField(max_length=50, default='')
    company = models.CharField(max_length=50, default='')
    description = models.TextField(default='')
    url = models.CharField(max_length=200, default='')
    close_date = models.DateField(default=datetime.date.today())
    requisition_id = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.job_title + ", " + self.company + ", " + str(self.applied_date) + ": " + self.job_status


class Contact(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    telephone = models.CharField(max_length=15)
    company = models.CharField(max_length=50)
    title = models.CharField(max_length=50, default="Recruiter")
    linkedin = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateField(auto_now=True)
    user = models.ForeignKey(User, related_name='contacts', on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name + " " + self.last_name + ", " + self.company