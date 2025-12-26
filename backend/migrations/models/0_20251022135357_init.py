from tortoise import BaseDBAsyncClient

RUN_IN_TRANSACTION = True


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "lead" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "full_name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "relationship" VARCHAR(50),
    "payer_type" VARCHAR(50),
    "state_program" VARCHAR(80),
    "needs_summary" TEXT,
    "preferred_schedule" VARCHAR(100),
    "status" VARCHAR(20) NOT NULL DEFAULT 'new',
    "source" VARCHAR(40) NOT NULL DEFAULT 'web'
);
CREATE TABLE IF NOT EXISTS "service" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,
    "covered_by" TEXT,
    "is_active" BOOL NOT NULL DEFAULT True,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "hashed_password" VARCHAR(255) NOT NULL,
    "is_admin" BOOL NOT NULL DEFAULT True,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """


MODELS_STATE = (
    "eJztmdtu2zgQhl/F8FUKpEXqtVtj7+ysd5sisYvG2S1aFAItjS0iEqmSVByjyLuXpM7HtY"
    "rEsQLdWcMZa+YbkvpF/ey71AKHv7kEZPX/7P3sE+SC/JGxn/b6yPMSqzIItHK0oxN5rLhg"
    "yBTStkYOB2mygJsMewJTIq3EdxxlpKZ0xGSTmHyCf/hgCLoBYQOTA9++SzMmFtwDjy69W2"
    "ONwcmmifW9td0QO0/bLoj4Wzuqu60Mkzq+SxJnbydsSmJvTISyboAAQwLU3wvmq/RVdmGV"
    "UUVBpolLkGIqxoI18h2RKndPBiYlip/MhusCN+ourwdvh++H4z/eDcenirQ0xZb3D0F5Se"
    "1BoCYwX/Yf9DgSKPDQGBNuJgNVrIFEkd9fckRgF8ohZiNzMK0w9E30I482AlnHNjIkcJMJ"
    "9Uh0ZQ3Wgji7sHE1KJcXV7Pr5eTqk6rE5fyHoxFNljM1MtDWXc568u6VslO5HII1Ev9J77"
    "+L5Yeeuux9XcxnmiDlYsP0HRO/5de+ygn5ghqEbg1kpeZYZI3ASM+ksb5n/WZjs5FdY5+1"
    "sWHySV/Xsl5DXxTaem4jVt7STFCuoxLbkfbQRfeGA2QjbHn5dnBW08R/J5/PP0w+n0ivXG"
    "fm4dAgGHvIwPQkiEYg44Dfghi299kY7oWwhmARILgIO00AxgHtBDga7UNwNKpGqMayDBk4"
    "SKXFbew1QZmPayXR0T5TclQ9JUfFNY12wAIKTRZ2JqpDGdYtqzU8RjcMuU1oFgJbCXS8D9"
    "BxNdBxASgBsLjBfddFbFcEuoT7ijeWQmBLgNbprtmXZUZyReBOriZfXmVk1+Vi/k/kngJ9"
    "frmY5hc/gzUwJtUrN22wfKfZJlAa3RLUObl0tpdcOquRS2el+4HPm24EQcThVKdcLNv+8U"
    "omTn1mNpqWScQBIW5h9WgQh/tAHFZDHGqI6uxnfZs6xVCGFTJvt4hZRmGEDmiVb3HIHbh5"
    "CyJoo+GoClX+4UnYNbA7bEK/5JAsGjqtOyfjKafuqOwxN8AnPioTWDR7nMQB3Rt3DDGdWQ"
    "P9kwtrC9BDyx+T3oGSL6tG4jIb1RK5c2i0mBtyp8Z3JTvAlFIHEKnYQNNxObYrGfhUEzfe"
    "XB+b7nSxuMzQnV7k8d1cTWdyZ9CopRMWkN5hu48PL+yMuvv48EIbq5M/Etl9w7XKLWhuba"
    "8V3H7k0antFqntA39ZODy/p/+wYCNuy63UQ5xvKSuZh9UwS0LborkPAFZpOsvFJW8w/ysF"
    "o7BOCXZK8OUJhk4JvtDGHpMSnADDpl2mBcORWjWIEp9OD7ZID94B46WHhtUiJhXSiZcYpF"
    "oaDSCG7u0E+CRfQeUdBZCS59nH68W86oQ1DsmBvCGywG8WNsVpz8FcfD9OrDUUVdX1p635"
    "g9Xcw0j9wfS5v+89/AJgZgH5"
)
