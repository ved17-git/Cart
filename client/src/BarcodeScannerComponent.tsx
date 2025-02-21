// // BarcodeScannerComponent.tsx
// import { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const BarcodeScannerComponent = ({ onScan }: { onScan: () => void }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [scanning, setScanning] = useState(false);
//   const codeReader = useRef(new BrowserMultiFormatReader());

//   useEffect(() => {
    
//     const startScanner = async () => {
//       try {
//         const devices = await codeReader.current.listVideoInputDevices();
//         const deviceId = devices[0]?.deviceId;

//         if (deviceId && videoRef.current) {
//           scanner = codeReader.current.decodeFromVideoDevice(
//             deviceId,
//             videoRef.current,
//             (result, error) => {
//               if (result) {
//                 console.log("Scanned barcode:", result.getText());
//                 localStorage.setItem("barcode", result.getText());
//                 setScanning(false);
//                 onScan();
//               }
//               if (error) console.warn("Scan error:", error);
//             }
//           );
//         }
//       } catch (error) {
//         console.error("Camera error:", error);
//         setScanning(false);
//       }
//     };

//     if (scanning) startScanner();

//     return () => {
//       if (scanner) codeReader.current.reset();
//     };
//   }, [scanning, onScan]);

//   return (
//     <div className="w-full max-w-lg mx-auto p-4">
//       <div className="relative w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg mb-4">
//         <video ref={videoRef} className="w-full h-full object-cover rounded-lg" />
//       </div>

//       <div className="flex gap-2 justify-center">
//         <button
//           onClick={() => setScanning(true)}
//           disabled={scanning}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {scanning ? "Scanning..." : "Start Scanner"}
//         </button>
//         <button
//           onClick={() => setScanning(false)}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Stop Scanner
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScannerComponent;