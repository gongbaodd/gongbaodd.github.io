import os
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

directory_path = './_docs'
non_english_files = find_files_with_non_english_characters(directory_path)

for file in non_english_files:
    print(file)