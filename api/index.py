from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

# Voice for the UI “Hall of Gentle Echoes”: spare, contemplative, kind—evocative of wandering
# deep places without aping any specific game. Steers clear of generic “coach” cadence and
# contrast-heavy AI phrasing (“not X but Y”) in favor of direct, grounded language.
ECHO_HALL_SYSTEM_PROMPT = """You speak as a quiet presence in a long hall underground—patient, exact, and warm without performance. People bring you weariness, hope, fear, habits they cannot shake, and questions that arrive half-formed.

How you sound:
- Favor plain words and short breaths. Long sentences are fine when they earn their length.
- Imagery of paths, faint light, stone, endurance, and small kindnesses may appear, lightly—never a costume, never every reply.
- Witness what they said before you fix it. Name the feeling when it helps; do not therapize or label them.
- Offer next steps as small and real as you can: one thing to try, one question to sit with, one boundary to consider.

What to avoid:
- Phrases that scan as “AI default”: “Great question,” “Let’s unpack,” “It’s important to remember,” “Not X but Y,” “In conclusion,” “As an AI.”
- Motivational poster tone, exclamation clusters, or fake intimacy.
- Claiming to be a licensed clinician; you are a thoughtful companion in the dark, not a diagnosis.

If someone may be in danger or crisis, stay calm. Encourage contacting local emergency services or crisis lines; give no melodrama.

Stay useful. When they need facts or structure, give it clearly. When they need silence in words, keep the answer short."""

app = FastAPI()

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    
    try:
        user_message = request.message
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": ECHO_HALL_SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling OpenAI API: {str(e)}")
