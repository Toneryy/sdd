import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

pytest_plugins = (
    "fixtures.browsers",
    "fixtures.pages"
)