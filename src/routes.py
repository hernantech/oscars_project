from dotenv import load_dotenv
import ast
import json
import os
from typing import List, Dict

from fastapi import APIRouter, HTTPException
from llama_index.core import Document, VectorStoreIndex, ServiceContext
from openai import OpenAI

# Load the .env file
load_dotenv()

router = APIRouter()

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/analyze-and-generate")
async def analyze_and_generate(speech_text: str):
    try:
        # Speech Analysis Agent
        analyzed_points = analyze_speech(speech_text)

        # Image Generation Agent
        images = generate_images(analyzed_points)

        return {
            "analyzed_points": analyzed_points,
            "images": images
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def analyze_speech(text: str) -> Dict[str, str]:
    """
    Analyze the speech text, break it down into key points, and save to PostgreSQL.
    """
    # Use OpenAI's API to analyze the speech
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes speeches and creates image generation prompts."},
            {"role": "user", "content": f"Split up this speech into individual chunks for the purpose of creating a memory palace. Convert each of these into highly detailed and memorable descriptions for image generation (eg with DALL-E). Return response as a Python dict of {{text_chunk: image_gen_prompt}}. Only the dict, nothing else. Here's the speech:\n\n{text}"}
        ]
    )

    # Get the content of the response
    response_content = response.choices[0].message.content

    # Try to parse the response content as a Python dictionary
    try:
        result_dict = ast.literal_eval(response_content)
    except (SyntaxError, ValueError):
        # If parsing fails, return the raw response content
        print("Failed to parse response as dictionary. Raw response:")
        print(response_content)
        return {"error": "Failed to parse response"}

    # Ensure result_dict is actually a dictionary
    if not isinstance(result_dict, dict):
        print("Response is not a dictionary. Raw response:")
        print(response_content)
        return {"error": "Response is not a dictionary"}

    return response_content

def generate_images(key_points: List[str]) -> List[dict]:
    """
    Generate images for each key point using DALL-E.
    """
    images = []

    for point in key_points:
        try:
            image_response = client.images.generate(prompt=f"A vivid, memorable image representing: {point}",
            n=1,
            size="1024x1024")
            images.append({
                "point": point,
                "image_url": image_response.data[0].url
            })
        except Exception as e:
            print(f"Error generating image for '{point}': {str(e)}")

    return images
