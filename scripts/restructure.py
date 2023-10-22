import os
import shutil

# Define the source and destination directories
source_directory = "../_posts"
destination_directory = "../_docs"  # You can change this to your desired destination

# Create the destination directory if it doesn't exist
os.makedirs(destination_directory, exist_ok=True)

# List all the files in the source directory
files = os.listdir(source_directory)

# Iterate through the files and move them to the new directory
for filename in files:
    if filename.endswith(".md") or filename.endswith(".markdown") or filename.endswith(".jpg") or filename.endswith(".svg"):
        # Split the filename into parts based on "-"
        parts = filename.split("-")
        # Remove the date prefix from the filename
        new_filename = filename[11:]  # Assuming the date format is "yyyy-mm-dd-xxx.md"

        # Extract the year, month, and day from the parts
        year = parts[0]
        month = parts[1]
        day = parts[2]
        
        # Create the new directory structure
        new_directory = os.path.join(destination_directory, year, month, day)
        
        # Create the new directory if it doesn't exist
        os.makedirs(new_directory, exist_ok=True)
        
          # Construct the new file path in the destination directory
        new_filepath = os.path.join(new_directory, new_filename)

        # Copy the file to the new path
        shutil.copy(os.path.join(source_directory, filename), new_filepath)

print("File restructuring complete.")
