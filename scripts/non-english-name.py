import os
import re
import string

def contains_non_english_characters(text):
    english_characters = set(string.ascii_letters + string.digits + string.punctuation + " ")
    for char in text:
        if char not in english_characters:
            return True
    return False

def find_files_with_non_english_characters(directory):
    non_english_files = []

    for root, dirs, files in os.walk(directory):
        for filename in files:
            if contains_non_english_characters(filename):
                non_english_files.append(os.path.join(root, filename))

    return non_english_files

def replace_non_english_with_hyphen(text):
    # Use regex to match non-English characters
    non_english_pattern = re.compile(r'[^(a-z|A-Z|0-9)\s.]')
    # Replace non-English characters with hyphens
    modified_text = re.sub(non_english_pattern, '-', text)
    # Replace multiple consecutive hyphens with a single hyphen
    modified_text = re.sub(r'-+', '-', modified_text)
    # Remove leading and trailing hyphens
    modified_text = modified_text.strip('-')
    return modified_text


directory_path = './_docs'
non_english_files = find_files_with_non_english_characters(directory_path)

for file in non_english_files:
    filename = os.path.basename(file)
    name, ext = os.path.splitext(filename)
    print("ext:" + ext)
    print(name)
    new_name = replace_non_english_with_hyphen(name)
    if new_name : print(new_name + ext)