import os
import re

redundant_pattern = re.compile(r'[!@#$%^&*()_+=\[\]{}|;:"<>,.?/~`\\]{2,}')

for root, dirs, files in os.walk("./_docs"):
    for filename in files:
        if re.search(redundant_pattern, filename):
            name, ext = os.path.splitext(filename)
            modified_filename = re.sub(r'[!@#$%^&*()_+=\[\]{}|;:"<>,.?/~`\\]', '-', name)
            modified_filename = re.sub(r'-+', '-', modified_filename)
            # Remove leading and trailing hyphens
            modified_filename = modified_filename.strip('-')
            file = os.path.join(root, filename)
            new_file = os.path.join(root, modified_filename + ext)
            os.rename(file, new_file)            