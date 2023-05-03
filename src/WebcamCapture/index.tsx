import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Container } from "./styles";

export function WebcamCapture() {
  const videoConstraints = {
    facingMode: 'user',
  }
  const [imgSrc, setImgSrc] = useState('')

  const webcamRef = useRef<any>(null)
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot()
      console.log(imageSrc)
      setImgSrc(imageSrc)
    },
    [webcamRef, setImgSrc]
  )

  function handleDownload(imgSrc: string) {
    const a = document.createElement('a')
    a.href = imgSrc
    a.download = 'teste.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <Container>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capturar imagem</button>
      
      {imgSrc && (
        <>
          <img src={imgSrc} alt=""/>
          <button onClick={() => handleDownload(imgSrc)}>download</button>
        </>
      )}
    </Container>

  )
}

// import { useEffect, useRef } from "react";
// import { Container } from "./styles";

// export function WebcamCapture() {
//   const videoRef = useRef<any>(null);
//   const canvasRef = useRef<any>(null);

//   async function startCamera() {
//     try {
//       await navigator.mediaDevices.getUserMedia({ 
//         video:  {
//           width: 200,
//           height: 200,
//           frameRate: 30,
//           facingMode: 'user'
//         }
//       }).then(stream => {
//         videoRef.current.srcObject = stream;
//       });
//     }
//     catch(err) {
//       alert(err)
//     }
//   }

//   function captureImage() {
//     const context = canvasRef.current.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//   }

//   useEffect(() => {
//     startCamera();
//   }, []);

//   return (
//     <Container>
//       <video ref={videoRef} autoPlay />
//       <canvas ref={canvasRef} width={200} height={200}/>
//       <button onClick={captureImage}>Capturar Imagem</button>
//     </Container>
//   );
// }
