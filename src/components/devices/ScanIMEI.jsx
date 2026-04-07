import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect } from "react"

export default function ScanIMEI({ onScan }) {

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 }
        )

        scanner.render(
            (decodedText) => {
                onScan(decodedText)
                scanner.clear()
            },
            () => {}
        )

    }, [])

    return <div id="reader"></div>
}