import torch
import os
import numpy as np
import argparse
from transformers import AutoTokenizer, AutoModelForSequenceClassification

def load(model_name: str = "joeddav/distilbert-base-uncased-go-emotions-student", device: str = 'cpu'):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)

    if device == 'cuda':
        model = model.to('cuda')

    genres = list(model.config.id2label.values())
    
    return [tokenizer, model, genres]

def classify(text: str, tokenizer: AutoTokenizer, model: AutoModelForSequenceClassification, 
             genres: list, threshold: float = 0.8, 
             device: str = 'cpu') -> str:
    encoding = tokenizer.encode_plus (
        text,
        return_tensors = "pt",
        max_length = 512,
        padding = "max_length",
        truncation = True
    )
    input_ids = encoding["input_ids"].to(device)
    attention_mask = encoding["attention_mask"].to(device)
    
    outputs = model(input_ids, attention_mask=attention_mask)
    outputs = torch.sigmoid(outputs.logits).detach().cpu().numpy().tolist()[0]
    outputs = np.array(outputs) >= threshold
    outputs = np.where(outputs == True)[0]
    outputs = [genres[i] for i in outputs]

    return outputs

def main():
    parser = argparse.ArgumentParser(description="Text Classifier")
    parser.add_argument("--model", type=str, help="Model name", default="joeddav/distilbert-base-uncased-go-emotions-student")
    parser.add_argument("--device", type=str, help="Device", default="cpu")
    args = parser.parse_args()

    tokenizer, model, genres = load(args.model, args.device)
    # Loop until the user exits
    while True:
        text = input("Enter text: ")
        res = classify(text, tokenizer, model, genres, device=args.device)
        print(res)

        if input('Press "q" to exit or any other key to continue: ') == "q":
            break

if __name__ == "__main__":
    main()