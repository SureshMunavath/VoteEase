
import pytesseract
from PIL import Image
import re
import os
import sys
import json

def extract_aadhaar_details_if_valid(image_path):
    if not os.path.exists(image_path):
        return False

    # OCR text extraction
    text = pytesseract.image_to_string(Image.open(image_path))
    lines = [line.strip() for line in text.split('\n') if line.strip()]

    # Combine full text for pattern matching
    full_text = ' '.join(lines)

    # Check Aadhaar identity
    if not ("Government of India" in full_text or "AADHAAR" in full_text):
        return False

    # Aadhaar number
    aadhaar_match = re.search(r"\b\d{4}\s\d{4}\s\d{4}\b", full_text)
    if not aadhaar_match:
        return False
    aadhaar_number = aadhaar_match.group()

    # DOB line and exact line index
    dob_line_index = -1
    dob = None
    dob_pattern = re.compile(r"(DOB|D.O.B|Birth|Date of Birth)[:\s]*([0-9]{2}[\/\-][0-9]{2}[\/\-][0-9]{4}|[0-9]{4}\-[0-9]{2}\-[0-9]{2})", re.IGNORECASE)

    for i, line in enumerate(lines):
        match = dob_pattern.search(line)
        if match:
            dob_line_index = i
            dob = match.group(2)
            break

    # Name: take line just above DOB
    name = None
    if dob_line_index > 0:
        possible_name = lines[dob_line_index - 1]
        # Simple check: name should not be purely digits
        if not re.search(r"\d", possible_name):
            name = possible_name

    return {
        "aadhaar_number": aadhaar_number,
        "dob": dob,
        "name": name
    }

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = extract_aadhaar_details_if_valid(image_path)
    
    if result:
        print(json.dumps(result))  # Return the extracted details as JSON
    else:
        print(json.dumps(False))  # If it's not a valid Aadhaar card, return False
