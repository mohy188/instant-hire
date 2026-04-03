import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (dataUrl: string) => void;
  capturedImage: string | null;
}

const CameraCapture = ({ onCapture, capturedImage }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 480 },
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setError("Camera access denied. Please allow camera access to proceed.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
      setCameraActive(false);
    }
  }, [stream]);

  useEffect(() => () => { stream?.getTracks().forEach((t) => t.stop()); }, [stream]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    onCapture(dataUrl);
    stopCamera();
  };

  const retake = () => {
    onCapture("");
    startCamera();
  };

  if (capturedImage) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-foreground">
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        </div>
        <Button type="button" variant="outline" size="sm" className="rounded-[7px] gap-2" onClick={retake}>
          <RotateCcw className="w-3.5 h-3.5" /> Retake Photo
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      {!cameraActive ? (
        <Button type="button" variant="outline" className="rounded-[7px] gap-2 h-11" onClick={startCamera}>
          <Camera className="w-4 h-4" /> Open Camera
        </Button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          <Button type="button" className="rounded-[7px] gap-2 h-10" onClick={takePhoto}>
            <Camera className="w-4 h-4" /> Capture
          </Button>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
