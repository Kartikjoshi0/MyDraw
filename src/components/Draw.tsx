import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft,faRotateRight,faSquare,faCircle,faSlash,faWindowMaximize} from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import Button from './Button';



interface Shape {
  type: string;
  data: any;
}

const Draw: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [history, setHistory] = useState<Shape[][]>([[]]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleShapeChange = (shape: string) => {
    setSelectedShape(shape);
  };

  const handleMouseDown = (e: any) => {
      setDrawing(true);
      const { offsetX, offsetY } = e.evt;
      setStartPos({ x: offsetX, y: offsetY });
      setEndPos({ x: offsetX, y: offsetY });
    
  };

  const handleMouseMove = (e: any) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.evt;
    setEndPos({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    if (!drawing) return;
    setDrawing(false);
    const newShape: Shape = {
      type: selectedShape,
      data: {
        start: { x: startPos.x, y: startPos.y },
        end: { x: endPos.x, y: endPos.y }
      }
    };
    setShapes([...shapes, newShape]);
    const newShapes = [...shapes, newShape];
   
    // setShapeCounts({ ...shapeCounts, [selectedShape]: shapeCounts[selectedShape] + 1 });
    setHistory([...history.slice(0, currentIndex + 1), newShapes]);
    setCurrentIndex(currentIndex + 1);
    setSelectedShape('')

  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShapes(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShapes(history[currentIndex + 1]);
    }
  };


  const renderShape = (shape: Shape, index: number) => {
    switch (shape.type) {
      case 'rectangle':
        return (
          
          <Rect
            key={index}
            x={shape.data.start.x}
            y={shape.data.start.y}
            width={shape.data.end.x - shape.data.start.x}
            height={shape.data.end.y - shape.data.start.y}
            stroke="black"
            strokeWidth={2}
          />
        );
      case 'square':
        return (
          <Rect
            key={index}
            x={shape.data.start.x}
            y={shape.data.start.y}
            width={shape.data.end.x - shape.data.start.x}
            height={shape.data.end.x - shape.data.start.x}
            stroke="black"
            strokeWidth={2}
          />
        );
      case 'circle':
        // eslint-disable-next-line no-case-declarations
        const radius = Math.sqrt(
          Math.pow(shape.data.end.x - shape.data.start.x, 2) +
          Math.pow(shape.data.end.y - shape.data.start.y, 2)
        );
        return (
          <Circle
            key={index}
            x={shape.data.start.x}
            y={shape.data.start.y}
            radius={radius}
            stroke="black"
            strokeWidth={2}
          />
        );
      case 'line':
        return (
          <Line
            key={index}
            points={[shape.data.start.x, shape.data.start.y, shape.data.end.x, shape.data.end.y]}
            stroke="black"
            strokeWidth={2}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col justify-center '>
      <div className='flex justify-center'>
        
      <Button label={<FontAwesomeIcon icon={faWindowMaximize} />} onClick={() => handleShapeChange('rectangle')} />
      <Button label={<FontAwesomeIcon icon={faCircle} />}  onClick={() => handleShapeChange('circle')} />
      <Button label={<FontAwesomeIcon icon={faSquare} />}onClick={() => handleShapeChange('square')} />
      <Button label={<FontAwesomeIcon icon={faSlash } />}  onClick={() => handleShapeChange('line')} />
      <Button label={<FontAwesomeIcon icon={faRotateLeft} />}  onClick={undo} />
      <Button label={<FontAwesomeIcon icon={faRotateRight} />}  onClick={redo} />
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape, index) => renderShape(shape, index))}
          {drawing && selectedShape === 'line' && (
            <Line
              points={[startPos.x, startPos.y, endPos.x, endPos.y]}
              stroke="black"
              strokeWidth={2}
            />
          )}
          {drawing && selectedShape !== 'line' && (
            <Rect
              x={Math.min(startPos.x, endPos.x)}
              y={Math.min(startPos.y, endPos.y)}
              width={Math.abs(endPos.x - startPos.x)}
              height={Math.abs(endPos.y - startPos.y)}
              stroke="black"
              strokeWidth={2}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Draw;
