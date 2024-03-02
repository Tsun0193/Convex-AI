import torch
import argparse
from transformers import AutoTokenizer, AutoModelForCausalLM

def load(model_name: str = 'M4-ai/TinyMistral-6x248M-Instruct', device: str = 'cpu'):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)

    if device == 'cuda':
        model = model.to(device)
    
    return [tokenizer, model]

def generate(prompt: str, tokenizer: AutoTokenizer, model: AutoModelForCausalLM,
             max_length: int = 50,
             do_sample: bool = True,
             temperature: float = 0.6, 
             device: str = 'cpu') -> str:
    inputs = tokenizer(prompt, return_tensors="pt")
    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask

    if device == 'cuda':
        input_ids = input_ids.to(device)
        attention_mask = attention_mask.to(device)

    outputs = model.generate(input_ids, attention_mask=attention_mask, max_length=max_length,
                             do_sample=do_sample, temperature=temperature)
    return tokenizer.batch_decode(outputs, skip_special_tokens=True)

def main():
    parser = argparse.ArgumentParser(description="Mixture of Experts Model")
    parser.add_argument("--model", type=str, help="Model name", default="M4-ai/TinyMistral-6x248M-Instruct")
    parser.add_argument("--device", type=str, help="Device", default="cpu")
    args = parser.parse_args()

    tokenizer, model = load(args.model, args.device)
    # Loop until the user exits
    while True:
        prompt = input("Enter prompt: ")
        res = generate(prompt, tokenizer, model, device=args.device)
        print(res)

        if input('Press "q" to exit or any other key to continue: ') == "q":
            break
    
if __name__ == "__main__":
    main()