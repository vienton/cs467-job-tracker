from django.contrib import admin
from .models import Job, Application, Contact

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('company', 'job_title', 'applied_date', 'job_status')

class JobAdmin(admin.ModelAdmin):
    list_display = ('company', 'job_title', 'open_date', 'close_date', 'requisition_id')

class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'telephone', 'company')

# Register the models
admin.site.register(Application, ApplicationAdmin)
admin.site.register(Job, JobAdmin)
admin.site.register(Contact, ContactAdmin)