import torch
import os
import numpy as np
import argparse
from flask import Flask, request
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)
CORS(app)

model_name = "joeddav/distilbert-base-uncased-go-emotions-student"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
genres = list(model.config.id2label.values())

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model.to(device)

@app.route('/classify', methods=['POST'])
def classify() -> str:
    message = request.args.get('message')
    if message is None or message.strip() == "":
        return "Error: No message provided"
    
    encoding = tokenizer.encode_plus (
        message,
        add_special_tokens = True,
        return_tensors = "pt",
        max_length = 512,
        padding = "max_length",
        truncation = True
    )
    input_ids = encoding["input_ids"].to(device)
    attention_mask = encoding["attention_mask"].to(device)
    
    outputs = model(input_ids, attention_mask=attention_mask)
    outputs = torch.sigmoid(outputs.logits).detach().cpu().numpy().tolist()[0]
    outputs = np.array(outputs) >= 0.8
    outputs = np.where(outputs == True)[0]
    outputs = [genres[i] for i in outputs]

    return outputs

if __name__ == "__main__":
    app.run(port=5000, debug=True)