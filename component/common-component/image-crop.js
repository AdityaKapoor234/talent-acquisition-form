import Cropper from "react-easy-crop";
import React, { useState, useEffect } from "react";
import getCroppedImg from "./cropped-image";

const aspectRatios = [
    { value: 4 / 3, text: "4/3" },
    { value: 16 / 9, text: "16/9" },
    { value: 1 / 2, text: "1/2" }
]

export default function imagecrop({
    src,
    onCancel,
    setCroppedImageFor
}) {
    const [srcurl, setSrc] = useState(src ? src : null);
    const [crop, setCrop] = useState({
        x: 0, y: 0
    });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(aspectRatios[0]);
    const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    }

    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatios.find((ratio)=> ratio.value==value );
        setAspect(ratio);
    }

    const onCropComplete = (croppedArea,croppedAreaPixels) => {
        setcroppedAreaPixels(croppedAreaPixels);
    }

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(srcurl,croppedAreaPixels);
        setCroppedImageFor(croppedImageUrl);
    }

    useEffect(() => {
        setSrc(src ? src : null);
    }, [src]);

    return (
        <div data-component="image-cropper">
            <div className="backdrop">
                <div className="dialog-cropper">
                    {srcurl && (
                        <div>
                            <Cropper
                                image={srcurl}
                                zoom={zoom}
                                crop={crop}
                                aspect={aspect.value}
                                onCropChange={onCropChange}
                                onZoomChange={onZoomChange}
                                onCropComplete={onCropComplete} />
                        </div>
                    )}
                </div>
                <div className="controls">
                    <div className="controls-upper-area">
                        <input
                            type="range"
                            min={1} max={3}
                            step={0.1}
                            value={zoom}
                            onInput={(e) => (onZoomChange(e.target.value))}
                            className="slider point-but">
                        </input>
                        <select onChange={onAspectChange} style={{"margin-left" : "10px"}}>
                            {aspectRatios.map(ratio=><option key={ratio.text} value={ratio.value} selected={ratio.value == aspect.value}>{ratio.text}</option>)}
                        </select>
                    </div>
                    <div className="button-area">
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={onCrop}>Crop</button>
                    </div>
                </div>
            </div>
        </div>
    );
}