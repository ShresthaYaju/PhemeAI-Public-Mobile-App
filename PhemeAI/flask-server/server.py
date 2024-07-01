from flask import Flask

app = Flask(__name__)

from dotenv import load_dotenv
load_dotenv()
import os
from newsapi import NewsApiClient
from newspaper import fulltext
import requests
import time
from openai import OpenAI



@app.route('/podcast/<keyword>')
def podcast(keyword):
    print("Hello World")
    # key = os.getenv('OpenAI_API_Key')
    # print(key)

    newsapi = NewsApiClient(os.getenv('News_API_Key'))
    headline = newsapi.get_everything(page=1,
                                  q=keyword,
                                  from_param='2023-11-01',
                                  language='en',
                                  sort_by='relevancy',
                                  )
    articles= headline['articles'][:3]
    # article = articles[0]
    
    podcast = []
    
    for article in articles:
    
        try:
            url=article['url']
            html= requests.get(url).text
            text= fulltext(html)
            # print("Text Pulled")
        
        except:
            print("Text Pull Failed")
            continue
        
        podcast.append(text)
        
 
     

    client = OpenAI(
            # defaults to os.environ.get("OPENAI_API_KEY")
            api_key=os.getenv('OpenAI_API_Key'),
        )
        
    # print("OpenAI Client Created")
        
        
      

    openAIResult= client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a Podcast creator that summarizes various text, blogs, news articles into daily podcasts"},
        {"role": "user", "content": f"Convert the array of text int a transcript for your podcast${podcast}. Talk like a real person. Our podcast should not exceed 3000 tokens. Our podcast should not exceed 3000 words."}
    ],
    # max_tokens=4000,
    )
    print("OpenAI Result Created")

    # print(completion.choices[0].message)
    
    # print(openAIResult.choices[0].message)
    
    response= openAIResult.choices[0].message.content
    
    audio=client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input=response,
)
    audio.stream_to_file(f"../audio/{keyword}.mp3")
    
    from supabase import create_client, Client
    supabaseUrl = "https://sgmejhdzljpwdyahzmix.supabase.co"
    supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbWVqaGR6bGpwd2R5YWh6bWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMjM2NjEsImV4cCI6MjAxNTU5OTY2MX0.x8hUXPDHUw1TgrGDqfGqmQD7B2yQXn5aNzlj9ZvyzCQ"

    supabase: Client = create_client(supabaseUrl, supabaseKey)
    
    with open(f"../audio/{keyword}.mp3", 'rb') as f:
        supabase.storage.from_("Pheme").upload(file=f,path=f"audio/{keyword}.mp3", file_options={"content-type": "audio/mpeg"})
    
    
    
    return {"openAIResponse": response}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port= "3000", debug=True)