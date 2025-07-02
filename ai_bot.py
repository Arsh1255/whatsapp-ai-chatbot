import re
import os
import sys
import requests
from textblob import TextBlob
from sympy import symbols, Eq, solve


API_KEY = os.getenv("API_KEY")

def ask_openrouter(prompt):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        #the identifier names of model aned messages can't be changed
        #as they have to match with the openrouter api

        "model": "mistralai/mixtral-8x7b-instruct",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful AI assistant. Answer questions and provide information to various questions related to all kinds of science,therapy,life and general phrases along with basic math and coding and programming."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        #This is the cleanest way to send debug/log messages without interfering with 
        # the actual response:This is the cleanest way to send debug/log messages without
        #  interfering with the actual response:
        
        print("[⚠️ ONLINE FAILED] Using offline TextBlob fallback...", file=sys.stderr)
        return offline_textblob_reply(prompt)

def offline_textblob_reply(prompt):
    # Clean prompt
    prompt = prompt.strip().lower()

    # Try solving simple math
    try:
        # Handle expressions like "what is 21 x 3" or "calculate 100 / 4"
        math_expr = re.findall(r"(\d+\s*[\+\-\*/x×]\s*\d+)", prompt)
        if math_expr:
            expr = math_expr[0].replace("x", "*").replace("×", "*")
            result = eval(expr)
            return f"The answer is {result}."

        # Handle expressions like "what is the square root of 144"
        if "square root" in prompt:
            number = int(re.findall(r'\d+', prompt)[0])
            return f"The square root of {number} is {number ** 0.5:.2f}."

        # Handle basic algebra like "solve 2x + 1 = 5"
        if "solve" in prompt and "x" in prompt:
            # Extract equation
            eq = re.findall(r"solve (.+)", prompt)[0].replace("=", "==")
            x = symbols('x')
            # Replace ^ with ** for power
            eq = eq.replace("^", "**")
            # Use eval to parse left and right
            left, right = eq.split("==")
            equation = Eq(eval(left), eval(right))
            solution = solve(equation, x)
            return f"The solution is: x = {solution[0]}"
    except Exception as e:
        pass  # Let it fall back to sentiment/default replies if math fails

    # Fallback to sentiment & keyword-based replies
    blob = TextBlob(prompt)
    if blob.sentiment.polarity > 0:
        return "You seem positive! How can I assist you further?"
    elif blob.sentiment.polarity < 0:
        return "I'm sorry you're feeling that way. Please let me know how I can help."
    elif "appointment" in prompt:
        return "Sure! You can book an appointment by providing the doctor's name and preferred time."
    elif "thank" in prompt:
        return "You're welcome!"
    else:
        return "I'm here to help. Can you please rephrase your question?"
    
if __name__ == "__main__":
    user_input = sys.stdin.read().strip()
    response = ask_openrouter(user_input)
    print(response)
