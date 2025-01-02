import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import MandalartGrid, {updateGridWithSubGoals} from "../components/MandalartGrid";
import MandalartGridData from "../domain/MandalartGridData";
import MandalartLayout from "./MandalartLayout";
import ActionButtons from "../components/ActionButtons";
import useMandalart from "../hooks/useMandalart";

function ViewMandalart() {
    const { id } = useParams();
    const { grid, setGrid, gridRef, handleCellChange, downloadScreenshot } = useMandalart(
        [], updateGridWithSubGoals
        );

    useEffect(() => {
        const fetchGrid = async () => {
            try {
                const docRef = doc(firestore, "mandalarts", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const jsonData = docSnap.data();
                    const gridData = MandalartGridData.fromJSON(jsonData);
                    setGrid(gridData.grid);
                } else {
                    alert("No data found for this ID.");
                }
            } catch (error) {
                console.error("Error fetching Mandalart:", error.message);
            }
        };

        fetchGrid();
    }, [id, setGrid]);

    const saveGrid = async () => {
        try {
            const docRef = doc(firestore, "mandalarts", id);
            const gridData = new MandalartGridData(grid);
            const jsonData = gridData.toJSON();

            await updateDoc(docRef, { grid: jsonData.grid });

            const shareUrl = `${window.location.origin}/${docRef.id}`;

            await navigator.clipboard.writeText(shareUrl);

            alert(`The URL has been copied to your clipboard:\n${shareUrl}`);
        } catch (error) {
            console.error("Error saving Mandalart:", error.message);
            alert("Failed to save the Mandalart.");
        }
    };

    return (
        <MandalartLayout>
            <div ref={gridRef}>
                <MandalartGrid grid={grid} onCellChange={handleCellChange} />
            </div>
            <ActionButtons onSave={saveGrid} onDownload={downloadScreenshot} saveLabel="Save" />
        </MandalartLayout>
    );
}

export default ViewMandalart;
