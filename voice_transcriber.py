import torch
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
import torchaudio
from typing import List
import argparse
import torchaudio.functional as F
import torchaudio.transforms as T

def load(model_name: str = "openai/whisper-tiny", device: str = "cpu"):
    processor = AutoProcessor.from_pretrained(model_name)
    model = AutoModelForSpeechSeq2Seq.from_pretrained(model_name)

    if device == "cuda":
        model = model.to("cuda")

    return [processor, model]

def preprocess(data: str, processor: AutoProcessor, device: str = "cpu") -> torch.Tensor:
    waveform, sample_rate = torchaudio.load(data)

    if sample_rate != 16000:
        transform = T.Resample(orig_freq=sample_rate, new_freq=16000)
        waveform = transform(waveform)
        sample_rate = 16000

    res = processor(waveform.squeeze().numpy(), sampling_rate=sample_rate, return_tensors="pt", padding=True)
    res = res.input_features

    if res.shape[2] < 3000:
        padding = torch.zeros(1, 80, 3000 - res.shape[2])
        res = torch.cat([res, padding], dim=2)

    if device == "cuda":
        res = res.to("cuda")

    # print(res.shape)
    return res

def inference(data: torch.Tensor, 
               model: AutoModelForSpeechSeq2Seq, processor: AutoProcessor,
               language: str = "en", device: str = "cpu") -> str:
    with torch.no_grad():
        geng = model.generate(data, language = language)
    
    transcript = processor.batch_decode(geng, skip_special_tokens=True)
    return transcript[0]

def main():
    parser = argparse.ArgumentParser(description="Voice Transcriber")
    parser.add_argument("--data", type=str, help="Path to the audio file", default = "data/sample.wav")
    parser.add_argument("--model", type=str, help="Model name", default="openai/whisper-tiny")
    parser.add_argument("--language", type=str, help="Language", default="en")
    parser.add_argument("--device", type=str, help="Device", default="cpu")
    args = parser.parse_args()

    processor, model = load(args.model, args.device)
    data = preprocess(args.data, processor, args.device)
    transcript = inference(data, model, processor, args.language, args.device)
    print(transcript)

if __name__ == "__main__":
    main()