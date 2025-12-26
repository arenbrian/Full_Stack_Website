from tortoise import fields, models

class Service(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=120)
    description = fields.TextField()
    covered_by = fields.TextField(null=True)  # e.g., Medicaid, Medicare, Private
    is_active = fields.BooleanField(default=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

class Lead(models.Model):
    id = fields.IntField(pk=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    full_name = fields.CharField(max_length=120)
    phone = fields.CharField(max_length=20, null=True)
    email = fields.CharField(max_length=255, null=True)
    relationship = fields.CharField(max_length=50, null=True)  # self, spouse, child, etc
    payer_type = fields.CharField(max_length=50, null=True)    # medicaid, medicare, private
    state_program = fields.CharField(max_length=80, null=True) # e.g., CDPAP
    needs_summary = fields.TextField(null=True)
    preferred_schedule = fields.CharField(max_length=100, null=True)
    status = fields.CharField(max_length=20, default="new")    # new, contacted, approved, rejected
    source = fields.CharField(max_length=40, default="web")

class User(models.Model):
    id = fields.IntField(pk=True)
    email = fields.CharField(max_length=255, unique=True)
    hashed_password = fields.CharField(max_length=255)
    is_admin = fields.BooleanField(default=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
