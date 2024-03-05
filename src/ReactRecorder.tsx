import React from 'react';
import AudioTimer from './AudioTimer';
import { ReactMic } from 'react-mic';
import axios from 'axios'

const ReactRecorder = ({callback, className}) => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [voice, setVoice] = React.useState(false);
    const [recordBlobLink, setRecordBlobLink] = React.useState(null);

    function saveBlob(blob, fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";

        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    
    const onStop = (recordedBlob) => {
        // saveBlob(new Blob([recordedBlob.blobURL], {type: 'audio/wav'}), 'test.wav');
        callback(recordedBlob.blobURL)
        setRecordBlobLink(recordedBlob.blobURL)
        setIsRunning(false)
        clearHandle()
    };

    const startHandle = () => {
        setElapsedTime(0)
        setIsRunning(true)
        setVoice(true)
    }
    const stopHandle = () => {
        setIsRunning(false)
        setVoice(false)
    }

    const clearHandle = () => {
        setIsRunning(false)
        setVoice(false)
        setRecordBlobLink(false)
        setElapsedTime(0)
    }

    return (
        <div className={className}>
            <div className=" max-w-sm border py-4 px-6 mx-auto bg-black  ">
                <AudioTimer isRunning={isRunning}
                    elapsedTime={elapsedTime}
                    setElapsedTime={setElapsedTime} />

                <ReactMic
                    record={voice}
                    className="react-mic"
                    onStop={onStop}
                    backgroundColor="#fff"
                    mimeType="audio/wav"
                />
                <div className=" mt-2  ">
                    {!voice ? <button onClick={startHandle} className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Start</button> : <button onClick={stopHandle} className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Stop</button>}
                </div>
            </div>
        </div>
    );
};

export default ReactRecorder;