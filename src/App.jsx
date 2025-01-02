import React from "react";
import MandalartGrid, {updateGridWithSubGoals} from "./components/MandalartGrid";
import { firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import MandalartGridData from "./domain/MandalartGridData";
import MandalartLayout from "./components/MandalartLayout";
import ActionButtons from "./components/ActionButtons";
import useMandalart from "./hooks/useMandalart";
import { customAlphabet } from "nanoid";

function App() {
    const { grid, setGrid, gridRef, handleCellChange, downloadScreenshot } = useMandalart(
        Array(9).fill(null).map(() => Array(9).fill("")),
        updateGridWithSubGoals
    );

    const saveGrid = async () => {
        try {
            const gridData = new MandalartGridData(grid);
            const jsonData = gridData.toJSON();

            const customNanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
            const uniqueId = customNanoid();

            const docRef = doc(firestore, "mandalarts", uniqueId);
            await setDoc(docRef, jsonData);

            const shareUrl = `${window.location.origin}/${uniqueId}`;

            await navigator.clipboard.writeText(shareUrl);

            alert(`The URL has been copied to your clipboard:\n${shareUrl}`);
        } catch (error) {
            console.error("Error saving Mandalart:", error);
            alert("Failed to save the Mandalart.");
        }
    };

    return (
        <MandalartLayout>
            <div ref={gridRef}>
                <MandalartGrid grid={grid} onCellChange={handleCellChange} />
            </div>
            <ActionButtons onSave={saveGrid} onDownload={downloadScreenshot} saveLabel="Share" />
        </MandalartLayout>
    );
}

export default App;
