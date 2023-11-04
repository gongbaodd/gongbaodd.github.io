import os
import re

def remove_unwanted_punctuation(filename):
    # Remove unwanted punctuation using regex
    modified_filename = re.sub(r'[-":]+', '-', filename)
    # Remove leading and trailing hyphens
    modified_filename = modified_filename.strip('-')
    return modified_filename

def fix_files_with_unwanted_punctuation(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            modified_filename = remove_unwanted_punctuation(filename)
            if modified_filename != filename:
                original_path = os.path.join(root, filename)
                new_path = os.path.join(root, modified_filename)
                print(new_path)
                os.rename(original_path, new_path)

directory_path = './_docs'  # Replace with the directory you want to search in
fix_files_with_unwanted_punctuation(directory_path)