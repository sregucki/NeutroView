import boto3
from typing import Any
from constants.aws_properties import LOCALSTACK_ENDPOINT


def get_dynamodb_client() -> Any:
  return boto3.resource("dynamodb", endpoint_url=LOCALSTACK_ENDPOINT) 
