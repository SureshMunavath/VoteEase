


import sys
import os
import json
from keras_facenet import FaceNet
import numpy as np
from PIL import Image

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs

embedder = FaceNet()

def compare_images(img1_path, img2_path):
    try:
        # Validate image paths
        if not os.path.exists(img1_path) or not os.path.exists(img2_path):
            return {'error': 'One or both image paths are invalid.'}

        # Load images
        detections1 = embedder.extract(img1_path, threshold=0.95)
        detections2 = embedder.extract(img2_path, threshold=0.95)

        # Check if faces are detected
        if len(detections1) == 0 or len(detections2) == 0:
            return {'error': 'No face detected in one or both images.'}

        # Extract embeddings
        emb1 = detections1[0]['embedding']
        emb2 = detections2[0]['embedding']

        # Compute similarity
        similarity_score = cosine_similarity(emb1, emb2)

        # Determine result
        return {
            'similarity': float(similarity_score),
            'result': 'faces_match' if similarity_score > 0.50 else 'different'
        }
    except Exception as e:
        return {'error': f"Error during comparison: {str(e)}"}

def cosine_similarity(a, b):
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return dot_product / (norm_a * norm_b)

if __name__ == '__main__':
    # Check for correct number of arguments
    if len(sys.argv) != 3:
        print(json.dumps({'error': 'Invalid number of arguments. Expected two image paths.'}))
        sys.exit(1)

    img1_path = sys.argv[1]
    img2_path = sys.argv[2]

    # Perform the comparison
    result = compare_images(img1_path, img2_path)

    # Output the result
    print(json.dumps(result))
