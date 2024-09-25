import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import useA4Editor from '@/hooks/useA4Editor';

export default function A4Editor() {
    const {
        elements,
        addImage,
        addText,
        handleDrag,
        handleTextChange,
        exportToImage,
        exportToPDF,
        inputRef,
        editorRef,
        isResizing,
        setIsResizing,
        setPadding,
        padding,
        setElements
    } = useA4Editor();

    return (
        <div class="flex flex-col justify-center items-center gap-2">
            <div class="flex flex-row justify-between gap-2 w-full"
                style={{ width: '210mm', maxWidth: '100%', position: 'relative', overflow: 'hidden' }}
            >
                <input ref={inputRef} type="file" accept="image/*" hidden onChange={addImage} />
                <div class="flex gap-2">
                    <button onClick={() => inputRef.current?.click()} class="min-w-[80px] text-xs md:text-sm font-semibold w-auto p-2 px-3 rounded-md bg-violet text-white">
                        Add Image
                    </button>
                    <button onClick={addText} class="min-w-[80px] w-auto p-2 px-3 text-xs md:text-sm font-semibold rounded-md bg-violet text-white">
                        Add Text
                    </button>
                </div>
                <div class="flex gap-2">
                    <input
                        type="number"
                        value={padding}
                        onChange={(e) => setPadding(Number(e.currentTarget.value))}
                        class="p-1 border rounded flex flex-shrink md:w-auto w-[50px]"
                        placeholder="Set Padding"
                    />
                    <button onClick={exportToImage} class="max-w-[80px] text-xs md:text-sm font-semibold  w-auto p-2 px-3 rounded-md bg-blue text-white h-full">
                        To Img
                    </button>
                    <button onClick={exportToPDF} class="max-w-[80px] text-xs md:text-sm font-semibold w-auto p-2 px-3 rounded-md bg-green text-white h-full">
                        To PDF
                    </button>
                </div>
            </div>

            {/* Responsive Editor */}
            <div
                ref={editorRef}
                class="relative w-full h-auto max-w-[210mm] border-4 border-spacing-8 border-separate border-violet bg-white rounded-md"
                style={{
                    aspectRatio: "210 / 297",
                    padding: `${padding}px`,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                }}
            >
                {elements.map((element, index) => {
                    if (element.type === 'image') {
                        return (
                            <Draggable
                                key={index}
                                defaultPosition={{ x: element.x, y: element.y }}
                                position={{ x: element.x, y: element.y }}
                                onDrag={(e, data) => !isResizing && handleDrag(index, data)} // Prevent dragging while resizing
                                disabled={isResizing} // Disable drag when resizing
                            >
                                <div style={{ position: 'absolute' }}>
                                    <ResizableBox
                                        width={element.width}
                                        height={element.height}
                                        minConstraints={[50, 50]}
                                        maxConstraints={[500, 500]}
                                        onResizeStart={() => setIsResizing(true)} // Start resizing
                                        onResizeStop={(e, { size }) => {
                                            const newElements = [...elements];
                                            newElements[index].width = size.width;
                                            newElements[index].height = size.height;
                                            setElements(newElements);
                                            setIsResizing(false); // Stop resizing
                                        }}
                                    >
                                        <img
                                            src={element.src}
                                            style={{ width: '100%', height: '100%' }}
                                            alt="element"
                                            draggable={false}
                                        />
                                    </ResizableBox>
                                </div>
                            </Draggable>
                        );
                    } else if (element.type === 'text') {
                        return (
                            <Draggable
                                key={index}
                                defaultPosition={{ x: element.x, y: element.y }}
                                onDrag={(e, data) => handleDrag(index, data)}
                            >
                                <div
                                    contentEditable
                                    //@ts-ignore
                                    suppressContentEditableWarning={true}
                                    onInput={(e) => handleTextChange(index, e)}
                                    style={{
                                        fontSize: element.fontSize,
                                        position: 'absolute',
                                        cursor: 'move',
                                        border: '1px dashed grey',
                                        padding: '2px',
                                        whiteSpace: 'pre-wrap', // Ensure text breaks correctly
                                    }}
                                >
                                    {element.content}
                                </div>
                            </Draggable>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
